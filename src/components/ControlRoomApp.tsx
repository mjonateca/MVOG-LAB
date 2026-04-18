"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent, TouchEvent } from "react";
import type { AppUser, ControlRoomState, Idea, IdeaInput, Status } from "@/lib/types";

type ViewKey = "brain" | "board" | "analytics" | "settings";
type FilterKey = "all" | "in-progress" | "high-value" | "sale-ready";

type Props = {
  accessToken: string;
  initialState: ControlRoomState;
  onSignOut: () => void;
  userEmail: string;
};

type Point3D = {
  x: number;
  y: number;
  z: number;
};

const STATUS_COLORS = ["#48f2a5", "#39d5ff", "#f4d35e", "#ff7aa8", "#9b8cff", "#ff9f5f", "#9ef05d"];

export function ControlRoomApp({ accessToken, initialState, onSignOut, userEmail }: Props) {
  const [state, setState] = useState(initialState);
  const [activeView, setActiveView] = useState<ViewKey>("brain");
  const [selectedId, setSelectedId] = useState(initialState.ideas[0]?.id || "");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [draftOpen, setDraftOpen] = useState(false);
  const [draftStatus, setDraftStatus] = useState(initialState.statuses[0]?.id || "");

  const selectedIdea = state.ideas.find((idea) => idea.id === selectedId) || state.ideas[0];

  const filteredIdeas = useMemo(() => {
    return state.ideas.filter((idea) => {
      const haystack = [idea.name, idea.market, idea.owner, idea.status, idea.value, idea.effort, idea.notes, ...idea.tags]
        .join(" ")
        .toLowerCase();
      const textMatch = haystack.includes(query.toLowerCase());
      const filterMatch =
        filter === "all" ||
        (filter === "high-value" && idea.value === "Alto") ||
        (filter === "sale-ready" && idea.status === "En venta") ||
        (filter === "in-progress" && !["Inbox", "En venta"].includes(idea.status));

      return textMatch && filterMatch;
    });
  }, [filter, query, state.ideas]);

  const averageProgress = state.ideas.length
    ? Math.round(state.ideas.reduce((sum, idea) => sum + progressFor(idea, state.statuses), 0) / state.ideas.length)
    : 0;

  const kpis = [
    { key: "all" as const, label: "Ideas", value: state.ideas.length, hint: "Orbitando ahora" },
    {
      key: "in-progress" as const,
      label: "En curso",
      value: state.ideas.filter((idea) => !["Inbox", "En venta"].includes(idea.status)).length,
      hint: `${averageProgress}% avance medio`
    },
    {
      key: "high-value" as const,
      label: "Valor alto",
      value: state.ideas.filter((idea) => idea.value === "Alto").length,
      hint: "Prioridad viva"
    },
    {
      key: "sale-ready" as const,
      label: "En venta",
      value: state.ideas.filter((idea) => idea.status === "En venta").length,
      hint: "Listas para mercado"
    }
  ];

  async function refresh() {
    const response = await fetch("/api/bootstrap", {
      cache: "no-store",
      headers: authHeaders(accessToken)
    });
    if (response.ok) {
      setState(await response.json());
    }
  }

  async function saveIdea(input: IdeaInput) {
    const localIdea = ideaFromInput(input, state, draftStatus);
    setState((current) => ({
      ...current,
      ideas: [localIdea, ...current.ideas],
      activity: [{ id: crypto.randomUUID(), at: new Date().toISOString(), text: `${localIdea.name} fue creada.` }, ...current.activity]
    }));
    setSelectedId(localIdea.id);
    setDraftOpen(false);
    setActiveView("brain");

    const response = await fetch("/api/ideas", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(input)
    });

    if (response.ok) {
      await refresh();
    }
  }

  async function moveIdea(idea: Idea, statusId: string) {
    const status = state.statuses.find((item) => item.id === statusId);
    if (!status) return;

    setState((current) => ({
      ...current,
      ideas: current.ideas.map((item) =>
        item.id === idea.id ? { ...item, statusId, status: status.name, updatedAt: new Date().toISOString() } : item
      )
    }));
    setSelectedId(idea.id);

    await fetch(`/api/ideas/${idea.id}`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
      body: JSON.stringify({ statusId, status: status.name, name: idea.name })
    });
  }

  return (
    <div className="labApp">
      <aside className="labSidebar">
        <div className="brand">
          <div className="brandMark">MV</div>
          <div>
            <h1>MVOG Lab</h1>
            <p>Cerebro de ideas</p>
          </div>
        </div>

        <nav className="nav" aria-label="Secciones">
          {(["brain", "board", "analytics", "settings"] as const).map((view) => (
            <button key={view} type="button" aria-selected={activeView === view} onClick={() => setActiveView(view)}>
              {viewLabel(view)}
              <span>{view === "brain" ? state.ideas.length : view === "settings" ? state.users.length : "live"}</span>
            </button>
          ))}
        </nav>

        <div className="sessionBox">
          <span>{userEmail}</span>
          <button className="btn ghost" type="button" onClick={onSignOut}>Salir</button>
        </div>
      </aside>

      <main className="labMain">
        <header className="labHero">
          <div>
            <p className="eyebrow">Control room</p>
            <h2>Explora el cerebro MVOG</h2>
            <p>Ideas vivas, estados y señales en una vista espacial para decidir rápido qué merece foco.</p>
          </div>
          <button
            className="btn"
            type="button"
            onClick={() => {
              setDraftStatus(state.statuses[0]?.id || "");
              setDraftOpen(true);
            }}
          >
            Nueva idea
          </button>
        </header>

        <section className="signalBar">
          {kpis.map((kpi) => (
            <button
              className={`signal ${filter === kpi.key ? "active" : ""}`}
              key={kpi.key}
              type="button"
              onClick={() => setFilter(kpi.key)}
            >
              <span>{kpi.label}</span>
              <b>{kpi.value}</b>
              <small>{kpi.hint}</small>
            </button>
          ))}
        </section>

        <div className="labToolbar">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar idea, pyme, dueño o etiqueta" />
          <button className="btn secondary" type="button" onClick={() => { setFilter("all"); setQuery(""); }}>
            Limpiar
          </button>
        </div>

        {activeView === "brain" && (
          <section className="brainStage">
            <BrainView
              ideas={filteredIdeas}
              selectedId={selectedIdea?.id}
              statuses={state.statuses}
              onOpen={(idea) => setSelectedId(idea.id)}
            />
            <aside className="focusPanel">
              {selectedIdea ? (
                <IdeaDetail idea={selectedIdea} statuses={state.statuses} onMove={moveIdea} />
              ) : (
                <div className="empty">Selecciona una tarjeta para abrir el detalle.</div>
              )}
            </aside>
          </section>
        )}

        {activeView === "board" && (
          <section className="workspace">
            <div className="board" style={{ ["--columns" as string]: state.statuses.length }}>
              {state.statuses.map((status) => {
                const ideas = filteredIdeas.filter((idea) => idea.status === status.name);
                const overloaded = ideas.length > status.wipLimit;
                return (
                  <section
                    className={`column ${overloaded ? "overloaded" : ""}`}
                    key={status.id}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      const id = event.dataTransfer.getData("text/plain");
                      const idea = state.ideas.find((item) => item.id === id);
                      if (idea) moveIdea(idea, status.id);
                    }}
                  >
                    <div className="columnHead">
                      <div>
                        <h3>{status.name}</h3>
                        <span>{ideas.length} ideas</span>
                      </div>
                      <span className="wip">WIP {ideas.length}/{status.wipLimit}</span>
                    </div>
                    <div className="ideaList">
                      {ideas.map((idea) => (
                        <button
                          className={`ideaCard ${selectedId === idea.id ? "selected" : ""}`}
                          draggable
                          key={idea.id}
                          type="button"
                          onDragStart={(event) => event.dataTransfer.setData("text/plain", idea.id)}
                          onClick={() => setSelectedId(idea.id)}
                        >
                          <strong>{idea.name}</strong>
                          <span>{idea.market} · {idea.owner}</span>
                          <div className="tags">
                            <span>{idea.value} valor</span>
                            <span>{idea.effort} dificultad</span>
                            {idea.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                          </div>
                          <Progress value={progressFor(idea, state.statuses)} label={idea.status} />
                        </button>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </section>
        )}

        {activeView === "analytics" && <Analytics state={state} />}
        {activeView === "settings" && <Settings state={state} />}
      </main>

      {draftOpen && (
        <dialog open>
          <IdeaForm
            state={state}
            defaultStatusId={draftStatus}
            onClose={() => setDraftOpen(false)}
            onSave={(input) => saveIdea(input)}
          />
        </dialog>
      )}
    </div>
  );
}

function BrainView({
  ideas,
  selectedId,
  statuses,
  onOpen
}: {
  ideas: Idea[];
  selectedId?: string;
  statuses: Status[];
  onOpen: (idea: Idea) => void;
}) {
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(-0.16);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ x: number; y: number; rotX: number; rotY: number } | null>(null);

  const points = useMemo(() => fibonacciSphere(Math.max(ideas.length, 1)), [ideas.length]);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    const loop = (time: number) => {
      const delta = (time - last) / 1000;
      last = time;
      if (autoRotate && !dragging && !hoverId) {
        setRotY((value) => value + delta * 0.16);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate, dragging, hoverId]);

  const radius = 255;
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const projected = ideas.map((idea, index) => {
    const point = points[index] || { x: 0, y: 0, z: 0 };
    const rotatedX = point.x * cosY - point.z * sinY;
    const rotatedZ = point.x * sinY + point.z * cosY;
    const rotatedY = point.y * cosX - rotatedZ * sinX;
    const depthZ = point.y * sinX + rotatedZ * cosX;
    return {
      idea,
      x: rotatedX * radius,
      y: rotatedY * radius,
      z: depthZ * radius
    };
  }).sort((a, b) => a.z - b.z);

  function pointerPosition(event: MouseEvent | TouchEvent) {
    if ("touches" in event) return event.touches[0];
    return event;
  }

  function startDrag(event: MouseEvent | TouchEvent) {
    const point = pointerPosition(event);
    setDragging(true);
    dragRef.current = { x: point.clientX, y: point.clientY, rotX, rotY };
  }

  function move(event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
    const point = pointerPosition(event);
    if (dragging && dragRef.current) {
      const dx = point.clientX - dragRef.current.x;
      const dy = point.clientY - dragRef.current.y;
      setRotY(dragRef.current.rotY + dx * 0.008);
      setRotX(Math.max(-1.1, Math.min(1.1, dragRef.current.rotX + dy * 0.008)));
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setMouse({
      x: (point.clientX - rect.left) / rect.width - 0.5,
      y: (point.clientY - rect.top) / rect.height - 0.5
    });
  }

  function stopDrag() {
    setDragging(false);
    dragRef.current = null;
  }

  const parallaxX = mouse.x * 18;
  const parallaxY = mouse.y * 18;

  return (
    <div className="brainWrap">
      <div className="brainGlow" />
      <div className="brainControls">
        <button className={`brainCtl ${autoRotate ? "on" : ""}`} type="button" onClick={() => setAutoRotate((value) => !value)}>
          {autoRotate ? "Girando" : "Estático"}
        </button>
        <button className="brainCtl" type="button" onClick={() => { setRotX(-0.16); setRotY(0); }}>
          Centrar
        </button>
        <span>Arrastra para rotar · toca una idea</span>
      </div>

      <div className="brainLegend">
        {statuses.map((status, index) => (
          <span key={status.id}>
            <i style={{ background: statusColor(status, statuses, index), boxShadow: `0 0 14px ${statusColor(status, statuses, index)}` }} />
            {status.name}
          </span>
        ))}
      </div>

      <div
        className={`brainCanvas ${dragging ? "dragging" : ""}`}
        onMouseDown={startDrag}
        onMouseMove={move}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={startDrag}
        onTouchMove={move}
        onTouchEnd={stopDrag}
      >
        <div className="brainSphere" style={{ transform: `translate(-50%, -50%) translate(${parallaxX}px, ${parallaxY}px) rotateX(${rotX}rad) rotateY(${rotY}rad)` }}>
          {[0, 1, 2, 3].map((ring) => (
            <span key={`ring-${ring}`} className="brainRing" style={{ transform: `rotateY(${ring * 45}deg)` }} />
          ))}
          {[-0.62, -0.32, 0, 0.32, 0.62].map((y) => (
            <span key={`eq-${y}`} className="brainRing eq" style={{ transform: `translateY(${y * radius}px) rotateX(90deg) scale(${Math.cos(Math.asin(y))})` }} />
          ))}
          <span className="brainCore" />
        </div>

        <div className="brainNodes" style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}>
          {projected.map(({ idea, x, y, z }) => {
            const status = statuses.find((item) => item.id === idea.statusId || item.name === idea.status);
            const color = statusColor(status, statuses);
            const depth = (z + radius) / (radius * 2);
            const active = hoverId === idea.id || selectedId === idea.id;
            const scale = active ? 1.12 : 0.62 + depth * 0.52;

            return (
              <button
                className={`brainNode ${active ? "active" : ""}`}
                key={idea.id}
                style={{
                  left: "50%",
                  top: "50%",
                  opacity: 0.34 + depth * 0.66,
                  transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                  zIndex: Math.round(z + 1000),
                  ["--idea-color" as string]: color
                }}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpen(idea);
                }}
                onMouseEnter={() => setHoverId(idea.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                <span className="nodePulse" />
                <span className="nodeDot" />
                <span className="nodeCard">
                  <small>{idea.status} · {progressFor(idea, statuses)}%</small>
                  <strong>{idea.name}</strong>
                  <em>{truncate(idea.market, 52)}</em>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="brainFooter">
        <strong>Cerebro de ideas</strong>
        <span>{ideas.length} {ideas.length === 1 ? "idea filtrada" : "ideas filtradas"}</span>
      </div>
    </div>
  );
}

function IdeaDetail({ idea, statuses, onMove }: { idea: Idea; statuses: Status[]; onMove: (idea: Idea, statusId: string) => void }) {
  return (
    <section className="ideaDetail">
      <p className="eyebrow">Idea enfocada</p>
      <h3>{idea.name}</h3>
      <p>{idea.notes || idea.market}</p>
      <div className="detailGrid">
        <span>Estado <b>{idea.status}</b></span>
        <span>Responsable <b>{idea.owner}</b></span>
        <span>Valor <b>{idea.value}</b></span>
        <span>Dificultad <b>{idea.effort}</b></span>
      </div>
      <Progress value={progressFor(idea, statuses)} label={idea.status} />
      <label>
        Mover estado
        <select value={idea.statusId || ""} onChange={(event) => onMove(idea, event.target.value)}>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>
      </label>
      <label>
        Prompt / script
        <textarea readOnly value={idea.prompt} />
      </label>
      <div className="tags">
        {idea.tags.length ? idea.tags.map((tag) => <span key={tag}>{tag}</span>) : <span>Sin etiquetas</span>}
      </div>
    </section>
  );
}

function IdeaForm({
  state,
  defaultStatusId,
  onClose,
  onSave
}: {
  state: ControlRoomState;
  defaultStatusId: string;
  onClose: () => void;
  onSave: (input: IdeaInput) => void;
}) {
  return (
    <form
      className="modal"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSave({
          name: String(data.get("name") || ""),
          market: String(data.get("market") || ""),
          ownerId: String(data.get("ownerId") || ""),
          statusId: String(data.get("statusId") || defaultStatusId),
          value: data.get("value") as IdeaInput["value"],
          effort: data.get("effort") as IdeaInput["effort"],
          notes: String(data.get("notes") || ""),
          prompt: String(data.get("prompt") || ""),
          tags: String(data.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean)
        });
      }}
    >
      <div className="modalHead">
        <h3>Nueva idea</h3>
        <button className="btn ghost" type="button" onClick={onClose}>Cerrar</button>
      </div>
      <label>Nombre<input name="name" required /></label>
      <label>Pyme o nicho<input name="market" required /></label>
      <div className="split">
        <label>Responsable
          <select name="ownerId" defaultValue={state.users[0]?.id}>
            {state.users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </label>
        <label>Estado
          <select name="statusId" defaultValue={defaultStatusId}>
            {state.statuses.map((status) => <option key={status.id} value={status.id}>{status.name}</option>)}
          </select>
        </label>
      </div>
      <div className="split">
        <label>Valor<select name="value" defaultValue="Medio"><option>Alto</option><option>Medio</option><option>Bajo</option></select></label>
        <label>Dificultad<select name="effort" defaultValue="Media"><option>Alta</option><option>Media</option><option>Baja</option></select></label>
      </div>
      <label>Notas<textarea name="notes" required /></label>
      <label>Prompt / script<textarea name="prompt" /></label>
      <label>Etiquetas<input name="tags" placeholder="IA, WhatsApp, inventario" /></label>
      <button className="btn" type="submit">Guardar idea</button>
    </form>
  );
}

function Analytics({ state }: { state: ControlRoomState }) {
  return (
    <section>
      <p className="eyebrow">KPIs</p>
      <h2>Señales del laboratorio</h2>
      <div className="analyticsGrid">
        {state.statuses.map((status) => {
          const count = state.ideas.filter((idea) => idea.status === status.name).length;
          const pct = state.ideas.length ? Math.round((count / state.ideas.length) * 100) : 0;
          return <Progress key={status.id} value={pct} label={`${status.name}: ${count}`} />;
        })}
      </div>
    </section>
  );
}

function Settings({ state }: { state: ControlRoomState }) {
  return (
    <section>
      <p className="eyebrow">Configuración</p>
      <h2>Equipo y acceso</h2>
      <div className="settingsGrid">
        {state.users.map((user: AppUser) => (
          <article className="rowCard" key={user.id}>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email} · {user.role}</span>
            </div>
            <span className={user.verified ? "verified" : "pending"}>{user.verified ? "Verificado" : "Pendiente"}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div className="progress">
      <div><span style={{ width: `${value}%` }} /></div>
      <small>{label} · {value}%</small>
    </div>
  );
}

function fibonacciSphere(count: number): Point3D[] {
  const points: Point3D[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / (count - 1 || 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * index;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }

  return points;
}

function progressFor(idea: Idea, statuses: Status[]) {
  const index = statusIndex(idea, statuses);
  return statuses.length <= 1 ? 100 : Math.round((index / (statuses.length - 1)) * 100);
}

function statusIndex(idea: Idea, statuses: Status[]) {
  return Math.max(0, statuses.findIndex((status) => status.name === idea.status || status.id === idea.statusId));
}

function statusColor(status: Status | undefined, statuses: Status[], fallbackIndex = 0) {
  const index = status ? Math.max(0, statuses.findIndex((item) => item.id === status.id || item.name === status.name)) : fallbackIndex;
  return STATUS_COLORS[index % STATUS_COLORS.length];
}

function viewLabel(view: ViewKey) {
  if (view === "brain") return "Cerebro";
  if (view === "board") return "Tablero";
  if (view === "analytics") return "Señales";
  return "Equipo";
}

function truncate(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length - 1)}…` : value;
}

function ideaFromInput(input: IdeaInput, state: ControlRoomState, fallbackStatusId: string): Idea {
  const owner = state.users.find((user) => user.id === input.ownerId);
  const status = state.statuses.find((item) => item.id === (input.statusId || fallbackStatusId));
  return {
    id: crypto.randomUUID(),
    name: input.name,
    market: input.market,
    ownerId: owner?.id,
    owner: owner?.name || "Sin responsable",
    statusId: status?.id,
    status: status?.name || "Inbox",
    value: input.value,
    effort: input.effort,
    notes: input.notes,
    prompt: input.prompt,
    tags: input.tags,
    updatedAt: new Date().toISOString()
  };
}

function authHeaders(accessToken: string) {
  return {
    authorization: `Bearer ${accessToken}`,
    "content-type": "application/json"
  };
}
