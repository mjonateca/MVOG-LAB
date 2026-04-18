"use client";

import { useEffect, useMemo, useState } from "react";
import type { ControlRoomState, Idea, IdeaInput, IdeaPhaseNote, Status } from "@/lib/types";

type ViewKey = "brain" | "detail" | "board" | "analytics";
type FilterKey = "all" | "in-progress" | "high-value" | "sale-ready";

type Props = {
  accessToken: string;
  initialState: ControlRoomState;
  onSignOut: () => void;
  userEmail: string;
};

const STATUS_COLORS = ["#48f2a5", "#39d5ff", "#f4d35e", "#ff7aa8", "#9b8cff", "#ff9f5f", "#9ef05d"];

export function ControlRoomApp({ accessToken, initialState, onSignOut, userEmail }: Props) {
  const [state, setState] = useState(initialState);
  const [activeView, setActiveView] = useState<ViewKey>("brain");
  const [selectedId, setSelectedId] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [draftOpen, setDraftOpen] = useState(false);
  const [draftStatus, setDraftStatus] = useState(initialState.statuses[0]?.id || "");

  const selectedIdea = state.ideas.find((idea) => idea.id === selectedId) || null;

  const filteredIdeas = useMemo(() => {
    return state.ideas.filter((idea) => {
      const haystack = [idea.name, idea.status, idea.value, idea.effort, idea.notes, ...idea.tags]
        .join(" ")
        .toLowerCase();
      const textMatch = haystack.includes(query.toLowerCase());
      const filterMatch =
        filter === "all" ||
        (filter === "high-value" && idea.value === "Alto") ||
        (filter === "sale-ready" && idea.status === "En venta") ||
        (filter === "in-progress" && !["IDEA", "Inbox", "En venta"].includes(idea.status));

      return textMatch && filterMatch;
    });
  }, [filter, query, state.ideas]);

  const averageProgress = state.ideas.length
    ? Math.round(state.ideas.reduce((sum, idea) => sum + developmentPercent(idea, state.statuses), 0) / state.ideas.length)
    : 0;

  const kpis = [
    { key: "all" as const, label: "Ideas", value: state.ideas.length, hint: "Orbitando ahora" },
    {
      key: "in-progress" as const,
      label: "En curso",
      value: state.ideas.filter((idea) => !["IDEA", "Inbox", "En venta"].includes(idea.status)).length,
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
    setActiveView("detail");

    const response = await fetch("/api/ideas", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(input)
    });

    if (response.ok) {
      const saved = await response.json();
      if (saved.id) setSelectedId(saved.id);
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

  function openIdea(idea: Idea) {
    setSelectedId(idea.id);
    setActiveView("detail");
  }

  async function updateIdeaMemory(idea: Idea, patch: Partial<IdeaInput>) {
    setState((current) => ({
      ...current,
      ideas: current.ideas.map((item) =>
        item.id === idea.id
          ? {
              ...item,
              ...patch,
              phaseNotes: [...(item.phaseNotes || []), ...(patch.phaseNotes || [])],
              updatedAt: new Date().toISOString()
            }
          : item
      )
    }));

    await fetch(`/api/ideas/${idea.id}`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
      body: JSON.stringify({ name: idea.name, ...patch })
    });
  }

  async function removeIdea(idea: Idea) {
    const confirmed = window.confirm(`Eliminar "${idea.name}"?`);
    if (!confirmed) return;

    setState((current) => ({
      ...current,
      ideas: current.ideas.filter((item) => item.id !== idea.id),
      activity: [{ id: crypto.randomUUID(), at: new Date().toISOString(), text: `${idea.name} fue eliminada.` }, ...current.activity]
    }));
    setSelectedId("");
    setActiveView("brain");

    await fetch(`/api/ideas/${idea.id}`, {
      method: "DELETE",
      headers: authHeaders(accessToken)
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
          {(["brain", "board", "analytics"] as const).map((view) => (
            <button key={view} type="button" aria-selected={activeView === view} onClick={() => setActiveView(view)}>
              {viewLabel(view)}
              <span>{view === "brain" ? state.ideas.length : "live"}</span>
            </button>
          ))}
        </nav>

        <div className="sessionBox">
          <span>{userEmail}</span>
          <button className="btn ghost" type="button" onClick={onSignOut}>Salir</button>
        </div>
      </aside>

      <main className="labMain">
        <header className="labHero compact">
          <div>
            <p className="eyebrow">MVOG Lab</p>
            <h2>{activeView === "detail" ? "Detalle de idea" : "Cerebro MVOG"}</h2>
          </div>
          <div className="heroActions">
            {activeView === "detail" && (
              <button className="btn secondary" type="button" onClick={() => setActiveView("brain")}>
                Volver al cerebro
              </button>
            )}
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
          </div>
        </header>

        {activeView === "brain" && (
          <>
            <BrainView
              ideas={filteredIdeas}
              selectedId={selectedId || undefined}
              statuses={state.statuses}
              onOpen={openIdea}
            />
            <section className="signalBar underBrain">
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
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar idea, fase o etiqueta" />
              <button className="btn secondary" type="button" onClick={() => { setFilter("all"); setQuery(""); }}>
                Limpiar
              </button>
            </div>
          </>
        )}

        {activeView === "detail" && selectedIdea && (
          <IdeaDetail
            idea={selectedIdea}
            statuses={state.statuses}
            onBack={() => setActiveView("brain")}
            onDelete={removeIdea}
            onMove={moveIdea}
            onUpdate={updateIdeaMemory}
          />
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
                          onClick={() => openIdea(idea)}
                        >
                          <strong>{idea.name}</strong>
                          <span>{idea.notes || idea.status}</span>
                          <div className="tags">
                            <span>{idea.value} valor</span>
                            <span>{idea.effort} dificultad</span>
                            {idea.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                          </div>
                          <Progress value={developmentPercent(idea, state.statuses)} label={idea.status} />
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
      </main>

      {draftOpen && (
        <dialog open>
          <IdeaForm
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
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const phaseOrbits = useMemo(() => statuses.map((status, index) => ({
    status,
    index,
    radius: phaseRingRadius(index, statuses.length)
  })), [statuses]);

  const projected = useMemo(() => {
    const totals = new Map<number, number>();
    ideas.forEach((idea) => {
      const index = statusIndex(idea, statuses);
      totals.set(index, (totals.get(index) || 0) + 1);
    });

    const seen = new Map<number, number>();
    return ideas.map((idea) => {
      const phaseIndex = statusIndex(idea, statuses);
      const totalInPhase = Math.max(totals.get(phaseIndex) || 1, 1);
      const orderInPhase = seen.get(phaseIndex) || 0;
      seen.set(phaseIndex, orderInPhase + 1);
      const angle = (orderInPhase / totalInPhase) * Math.PI * 2 + phaseIndex * 0.16;
      const orbitRadius = phaseRingRadius(phaseIndex, statuses.length);
      const depth = 0.58 + (phaseIndex / Math.max(statuses.length - 1, 1)) * 0.34;

      return {
        idea,
        angle,
        orbitRadius,
        phaseIndex,
        depth
      };
    });
  }, [ideas, statuses]);

  return (
    <div className="brainWrap">
      <div className="brainGlow" />
      <div className="brainControls">
        <button className={`brainCtl ${autoRotate ? "on" : ""}`} type="button" onClick={() => setAutoRotate((value) => !value)}>
          {autoRotate ? "Girando" : "Estático"}
        </button>
        <span>Toca una idea para abrir su detalle</span>
      </div>

      <div className="brainLegend">
        {statuses.map((status, index) => (
          <span key={status.id}>
            <i style={{ background: statusColor(status, statuses, index), boxShadow: `0 0 14px ${statusColor(status, statuses, index)}` }} />
            {status.name}
          </span>
        ))}
      </div>

      <div className={`brainCanvas ${autoRotate && !hoverId ? "spinning" : ""}`}>
        <div className="brainSphere">
          <span className="brainCore" />
          {phaseOrbits.map(({ status, index, radius }) => (
            <span
              aria-hidden="true"
              className="brainRing phaseRing"
              key={status.id}
              style={{
                ["--ring-color" as string]: statusColor(status, statuses, index),
                ["--ring-size" as string]: `${radius * 2}px`
              }}
            />
          ))}
        </div>

        <div className="brainNodes">
          {projected.map(({ idea, angle, orbitRadius, phaseIndex, depth }, index) => {
            const status = statuses.find((item) => item.id === idea.statusId || item.name === idea.status);
            const color = statusColor(status, statuses);
            const active = hoverId === idea.id;
            const selected = selectedId === idea.id;
            const scale = active ? 1.12 : 0.62 + depth * 0.52;
            const duration = 26 + phaseIndex * 3 + (index % 3);
            const delay = -(angle / (Math.PI * 2)) * duration;

            return (
              <button
                className={`brainNode ${active ? "active" : ""} ${selected ? "selected" : ""}`}
                key={idea.id}
                style={{
                  left: "50%",
                  top: "50%",
                  opacity: 0.34 + depth * 0.66,
                  zIndex: Math.round(depth * 1000),
                  ["--orbit-radius" as string]: `${orbitRadius}px`,
                  ["--orbit-duration" as string]: `${duration}s`,
                  ["--orbit-delay" as string]: `${delay}s`,
                  ["--node-scale" as string]: scale,
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
                  <small>{idea.status} · {developmentPercent(idea, statuses)}%</small>
                  <strong>{idea.name}</strong>
                  <em>{truncate(idea.notes || "Sin concepto base todavía.", 52)}</em>
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

function IdeaDetail({
  idea,
  statuses,
  onBack,
  onDelete,
  onMove,
  onUpdate
}: {
  idea: Idea;
  statuses: Status[];
  onBack: () => void;
  onDelete: (idea: Idea) => void;
  onMove: (idea: Idea, statusId: string) => void;
  onUpdate: (idea: Idea, patch: Partial<IdeaInput>) => void;
}) {
  const phaseNotes = idea.phaseNotes || [];
  const [expanded, setExpanded] = useState(phaseNotes[0]?.id || "");
  const currentStatus = statuses.find((status) => status.id === idea.statusId || status.name === idea.status) || statuses[0];
  const phaseNotesByName = new Map(phaseNotes.map((note) => [note.statusName, note]));

  useEffect(() => {
    setExpanded("");
  }, [idea.id]);

  function savePhaseNote(form: FormData) {
    const statusId = String(form.get("statusId") || currentStatus?.id || "");
    const status = statuses.find((item) => item.id === statusId) || currentStatus;
    const note: IdeaPhaseNote = {
      id: crypto.randomUUID(),
      statusId: status?.id || null,
      statusName: status?.name || idea.status,
      summary: String(form.get("summary") || ""),
      details: String(form.get("details") || ""),
      link: String(form.get("link") || ""),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setExpanded(note.id);
    onUpdate(idea, { phaseNotes: [note] });
  }

  function saveEvaluation(form: FormData) {
    onUpdate(idea, {
      developmentProgress: Number(form.get("developmentProgress") || idea.developmentProgress || 0),
      returnScore: numberOrNull(form.get("returnScore")),
      difficultyScore: numberOrNull(form.get("difficultyScore")),
      value: String(form.get("value") || idea.value) as IdeaInput["value"],
      effort: String(form.get("effort") || idea.effort) as IdeaInput["effort"]
    });
  }

  return (
    <section className="ideaDetail">
      <div className="detailHero">
        <div>
          <p className="eyebrow">Idea</p>
          <h3>{idea.name}</h3>
          <p>{idea.notes || "Añade un concepto para empezar a desarrollar esta idea."}</p>
        </div>
        <div className="detailActions">
          <button className="btn secondary" type="button" onClick={onBack}>Volver</button>
          <button className="btn danger" type="button" onClick={() => onDelete(idea)}>Eliminar idea</button>
        </div>
      </div>
      <div className="detailGrid">
        <span>Estado <b>{idea.status}</b></span>
        <span>Valor <b>{idea.value}</b></span>
        <span>Dificultad <b>{idea.effort}</b></span>
        <span>Desarrollo <b>{developmentPercent(idea, statuses)}%</b></span>
      </div>
      <Progress value={developmentPercent(idea, statuses)} label={idea.status} />
      <div className="detailLong">
        <h4>Concepto base</h4>
        <p>{idea.notes || "Sin concepto base todavía."}</p>
        {idea.prompt && <p><b>Prompt / script:</b> {idea.prompt}</p>}
      </div>
      <label>
        Saltar a cualquier fase
        <select value={currentStatus?.id || ""} onChange={(event) => onMove(idea, event.target.value)}>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>
      </label>

      <div className="phaseTimeline">
        {statuses.map((status) => {
          const note = phaseNotesByName.get(status.name);
          const reached = statusIndex(idea, statuses) >= statuses.indexOf(status);
          return (
            <button
              className={`${reached ? "reached" : ""} ${note ? "hasNote" : ""}`}
              key={status.id}
              type="button"
              onClick={() => note && setExpanded(note.id)}
            >
              <i />
              <span>{status.name}</span>
            </button>
          );
        })}
      </div>

      <div className="phaseMemory">
        <h4>Memoria por fase</h4>
        {phaseNotes.length ? phaseNotes.map((note) => (
          <article key={note.id}>
            <button type="button" onClick={() => setExpanded(expanded === note.id ? "" : note.id)}>
              <strong>{note.statusName}</strong>
              <span>{note.summary || "Detalle guardado"}</span>
            </button>
            {expanded === note.id && (
              <div>
                <p>{note.details || note.summary}</p>
                {note.link && <a href={note.link} target="_blank" rel="noreferrer">Abrir enlace</a>}
              </div>
            )}
          </article>
        )) : <p>Aún no hay memoria guardada por fase.</p>}
      </div>

      <form
        className="phaseForm"
        onSubmit={(event) => {
          event.preventDefault();
          savePhaseNote(new FormData(event.currentTarget));
          event.currentTarget.reset();
        }}
      >
        <h4>Añadir información a una fase</h4>
        <label>Fase
          <select name="statusId" defaultValue={currentStatus?.id}>
            {statuses.map((status) => <option key={status.id} value={status.id}>{status.name}</option>)}
          </select>
        </label>
        <label>Resumen<input name="summary" placeholder="Concepto, aprendizaje, hito o decisión" /></label>
        <label>Detalle<textarea name="details" placeholder="Amplía la información de esta fase" /></label>
        <label>Enlace<input name="link" placeholder="https://..." /></label>
        <button className="btn secondary" type="submit">Guardar memoria</button>
      </form>

      <form
        className="phaseForm"
        onSubmit={(event) => {
          event.preventDefault();
          saveEvaluation(new FormData(event.currentTarget));
        }}
      >
        <h4>Evaluación</h4>
        <div className="split">
          <label>Retorno potencial
            <input defaultValue={idea.returnScore ?? ""} max="10" min="0" name="returnScore" placeholder="0-10" type="number" />
          </label>
          <label>Dificultad real
            <input defaultValue={idea.difficultyScore ?? ""} max="10" min="0" name="difficultyScore" placeholder="0-10" type="number" />
          </label>
        </div>
        <label>% desarrollo
          <input defaultValue={idea.developmentProgress ?? progressFor(idea, statuses)} max="100" min="0" name="developmentProgress" type="number" />
        </label>
        <div className="split">
          <label>Valor<select name="value" defaultValue={idea.value}><option>Alto</option><option>Medio</option><option>Bajo</option></select></label>
          <label>Dificultad<select name="effort" defaultValue={idea.effort}><option>Alta</option><option>Media</option><option>Baja</option></select></label>
        </div>
        <button className="btn secondary" type="submit">Guardar evaluación</button>
      </form>

      <div className="tags">
        {idea.tags.length ? idea.tags.map((tag) => <span key={tag}>{tag}</span>) : <span>Sin etiquetas</span>}
      </div>
    </section>
  );
}

function IdeaForm({
  defaultStatusId,
  onClose,
  onSave
}: {
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
        const concept = String(data.get("concept") || "");
        onSave({
          name: String(data.get("name") || ""),
          market: "General",
          ownerId: null,
          statusId: defaultStatusId,
          value: "Medio",
          effort: "Media",
          notes: concept,
          prompt: "",
          tags: [],
          developmentProgress: 0,
          returnScore: null,
          difficultyScore: null
        });
      }}
    >
      <div className="modalHead">
        <h3>Nueva idea</h3>
        <button className="btn ghost" type="button" onClick={onClose}>Cerrar</button>
      </div>
      <label>Nombre<input name="name" required /></label>
      <label>Breve concepto<textarea name="concept" placeholder="Opcional: una frase o dos para recordar de qué va." /></label>
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

function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div className="progress">
      <div><span style={{ width: `${value}%` }} /></div>
      <small>{label} · {value}%</small>
    </div>
  );
}

function progressFor(idea: Idea, statuses: Status[]) {
  const index = statusIndex(idea, statuses);
  return statuses.length <= 1 ? 100 : Math.round((index / (statuses.length - 1)) * 100);
}

function developmentPercent(idea: Idea, statuses: Status[]) {
  return idea.developmentProgress ?? progressFor(idea, statuses);
}

function statusIndex(idea: Idea, statuses: Status[]) {
  return Math.max(0, statuses.findIndex((status) => status.name === idea.status || status.id === idea.statusId));
}

function phaseRingRadius(index: number, total: number) {
  const min = 66;
  const max = 250;
  if (total <= 1) return max;
  return min + (Math.max(index, 0) / (total - 1)) * (max - min);
}

function statusColor(status: Status | undefined, statuses: Status[], fallbackIndex = 0) {
  const index = status ? Math.max(0, statuses.findIndex((item) => item.id === status.id || item.name === status.name)) : fallbackIndex;
  return STATUS_COLORS[index % STATUS_COLORS.length];
}

function viewLabel(view: ViewKey) {
  if (view === "brain") return "Cerebro";
  if (view === "detail") return "Detalle";
  if (view === "board") return "Tablero";
  return "Señales";
}

function truncate(value: string, length: number) {
  return value.length > length ? `${value.slice(0, length - 1)}…` : value;
}

function ideaFromInput(input: IdeaInput, state: ControlRoomState, fallbackStatusId: string): Idea {
  const status = state.statuses.find((item) => item.id === (input.statusId || fallbackStatusId));
  return {
    id: crypto.randomUUID(),
    name: input.name,
    market: input.market,
    ownerId: null,
    owner: "",
    statusId: status?.id,
    status: status?.name || "IDEA",
    value: input.value,
    effort: input.effort,
    notes: input.notes,
    prompt: input.prompt,
    tags: input.tags,
    phaseNotes: input.phaseNotes || [],
    developmentProgress: input.developmentProgress || 0,
    returnScore: input.returnScore ?? null,
    difficultyScore: input.difficultyScore ?? null,
    updatedAt: new Date().toISOString()
  };
}

function numberOrNull(value: FormDataEntryValue | null) {
  if (value === null || value === "") return null;
  return Number(value);
}

function authHeaders(accessToken: string) {
  return {
    authorization: `Bearer ${accessToken}`,
    "content-type": "application/json"
  };
}
