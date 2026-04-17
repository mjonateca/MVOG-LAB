"use client";

import { useMemo, useState } from "react";
import type { AppUser, ControlRoomState, Idea, IdeaInput, Status } from "@/lib/types";

type FilterKey = "all" | "in-progress" | "high-value" | "sale-ready";

type Props = {
  initialState: ControlRoomState;
};

export function ControlRoomApp({ initialState }: Props) {
  const [state, setState] = useState(initialState);
  const [activeView, setActiveView] = useState<"board" | "analytics" | "settings">("board");
  const [selectedId, setSelectedId] = useState(initialState.ideas[0]?.id || "");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [draftOpen, setDraftOpen] = useState(false);
  const [draftStatus, setDraftStatus] = useState(initialState.statuses[0]?.id || "");

  const selectedIdea = state.ideas.find((idea) => idea.id === selectedId) || state.ideas[0];

  const filteredIdeas = useMemo(() => {
    return state.ideas.filter((idea) => {
      const haystack = [idea.name, idea.market, idea.owner, idea.status, idea.value, idea.effort, ...idea.tags]
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
    { key: "all" as const, label: "Ideas activas", value: state.ideas.length, hint: "Todas las ideas" },
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
      hint: "Campo manual de prioridad"
    },
    {
      key: "sale-ready" as const,
      label: "En venta",
      value: state.ideas.filter((idea) => idea.status === "En venta").length,
      hint: "Último estado del flujo"
    }
  ];

  async function refresh() {
    const response = await fetch("/api/bootstrap", { cache: "no-store" });
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

    const response = await fetch("/api/ideas", {
      method: "POST",
      headers: { "content-type": "application/json" },
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
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ statusId, status: status.name, name: idea.name })
    });
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandMark">MV</div>
          <div>
            <h1>MVOG Control Room</h1>
            <p>Planificador interno</p>
          </div>
        </div>
        <nav className="nav" aria-label="Secciones">
          {(["board", "analytics", "settings"] as const).map((view) => (
            <button key={view} type="button" aria-selected={activeView === view} onClick={() => setActiveView(view)}>
              {view === "board" ? "Tablero" : view === "analytics" ? "KPIs" : "Equipo"}
              <span>{view === "board" ? state.ideas.length : view === "settings" ? state.users.length : "live"}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main>
        {activeView === "board" && (
          <>
            <header className="topline">
              <div>
                <p className="eyebrow">Control room</p>
                <h2>MVOG Control Room</h2>
                <p>Planifica ideas internas, arrástralas por estados y abre cada tarea para ver detalle operativo.</p>
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

            <section className="kpis">
              {kpis.map((kpi) => (
                <button
                  className={`kpi ${filter === kpi.key ? "active" : ""}`}
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

            <div className="toolbar">
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar idea, pyme, dueño o etiqueta" />
              <button
                className="btn secondary"
                type="button"
                onClick={() => {
                  setFilter("all");
                  setQuery("");
                }}
              >
                Limpiar filtros
              </button>
            </div>

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

              <aside className="detail">
                {selectedIdea ? (
                  <IdeaDetail idea={selectedIdea} statuses={state.statuses} onMove={moveIdea} />
                ) : (
                  <div className="empty">Selecciona una idea para abrir el detalle.</div>
                )}
              </aside>
            </section>

            <section className="flowDock">
              <h3>Flow scan</h3>
              <div className="flowGrid">
                {state.ideas.map((idea) => (
                  <button className="flowCard" key={idea.id} type="button" onClick={() => setSelectedId(idea.id)}>
                    <strong>{idea.name}</strong>
                    <div className="flowRail" style={{ ["--steps" as string]: state.statuses.length }}>
                      {state.statuses.map((status) => (
                        <span key={status.id} className={state.statuses.indexOf(status) <= statusIndex(idea, state.statuses) ? "done" : ""} />
                      ))}
                    </div>
                    <small>{idea.status} · {progressFor(idea, state.statuses)}%</small>
                  </button>
                ))}
              </div>
            </section>
          </>
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

function IdeaDetail({ idea, statuses, onMove }: { idea: Idea; statuses: Status[]; onMove: (idea: Idea, statusId: string) => void }) {
  return (
    <section>
      <p className="eyebrow">Idea enfocada</p>
      <h3>{idea.name}</h3>
      <p>{idea.notes}</p>
      <div className="detailGrid">
        <span>Estado <b>{idea.status}</b></span>
        <span>Responsable <b>{idea.owner}</b></span>
        <span>Valor <b>{idea.value}</b></span>
        <span>Dificultad <b>{idea.effort}</b></span>
      </div>
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

function progressFor(idea: Idea, statuses: Status[]) {
  const index = statusIndex(idea, statuses);
  return statuses.length <= 1 ? 100 : Math.round((index / (statuses.length - 1)) * 100);
}

function statusIndex(idea: Idea, statuses: Status[]) {
  return Math.max(0, statuses.findIndex((status) => status.name === idea.status || status.id === idea.statusId));
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
