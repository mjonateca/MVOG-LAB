"use client";

import { useEffect, useMemo, useState } from "react";
import type { CalendarEvent, CalendarEventInput, ControlRoomState, Idea, IdeaInput, IdeaPhaseNote, Status } from "@/lib/types";

type ViewKey = "brain" | "detail" | "board" | "calendar" | "analytics";
type FilterKey = "all" | "in-progress" | "high-value" | "sale-ready";
type BrainMode = "spin" | "static" | "flat";
type CalendarPerson = { name: string; email?: string | null; initials: string };

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
  const [eventOpen, setEventOpen] = useState(false);
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
    const conceptStatus = input.notes.trim() ? findStatusByName(state.statuses, "Concepto") : null;
    const inputWithCreator = {
      ...input,
      statusId: conceptStatus?.id || input.statusId,
      status: conceptStatus?.name || input.status,
      developmentProgress: conceptStatus ? progressForStatus(conceptStatus, state.statuses) : input.developmentProgress,
      tags: [...input.tags.filter((tag) => !tag.startsWith("creator:")), `creator:${creatorInitialsForEmail(userEmail)}`]
    };
    const localIdea = ideaFromInput(inputWithCreator, state, draftStatus);
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
      body: JSON.stringify(inputWithCreator)
    });

    if (response.ok) {
      const saved = await response.json();
      if (saved.id) setSelectedId(saved.id);
      await refresh();
    }
  }

  async function saveCalendarEvent(input: CalendarEventInput) {
    const localEvent = calendarEventFromInput(input);
    setState((current) => ({
      ...current,
      calendarEvents: [...current.calendarEvents, localEvent].sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()),
      activity: [{ id: crypto.randomUUID(), at: new Date().toISOString(), text: `${localEvent.ownerName} tiene ${localEvent.title} en calendario.` }, ...current.activity]
    }));
    setEventOpen(false);
    setActiveView("calendar");

    const response = await fetch("/api/calendar", {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(input)
    });

    if (response.ok) {
      await refresh();
    }
  }

  async function removeCalendarEvent(event: CalendarEvent) {
    const confirmed = window.confirm(`Eliminar "${event.title}" del calendario?`);
    if (!confirmed) return;

    setState((current) => ({
      ...current,
      calendarEvents: current.calendarEvents.filter((item) => item.id !== event.id),
      activity: [{ id: crypto.randomUUID(), at: new Date().toISOString(), text: `${event.title} fue eliminado del calendario.` }, ...current.activity]
    }));

    await fetch(`/api/calendar/${event.id}`, {
      method: "DELETE",
      headers: authHeaders(accessToken)
    });
  }

  async function patchCalendarEvent(event: CalendarEvent, patch: Partial<CalendarEventInput>) {
    const nextEvent = { ...event, ...patch };
    setState((current) => ({
      ...current,
      calendarEvents: current.calendarEvents
        .map((item) => (item.id === event.id ? nextEvent : item))
        .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    }));

    const response = await fetch(`/api/calendar/${event.id}`, {
      method: "PATCH",
      headers: authHeaders(accessToken),
      body: JSON.stringify(patch)
    });

    if (response.ok) {
      await refresh();
    }
  }

  async function moveCalendarEvent(event: CalendarEvent, nextDate: string) {
    const movedStartsAt = moveEventToDate(event.startsAt, nextDate);
    const movedEndsAt = event.endsAt ? moveEventToDate(event.endsAt, nextDate) : null;
    await patchCalendarEvent(event, { startsAt: movedStartsAt, endsAt: movedEndsAt });
  }

  async function toggleCalendarEventComplete(event: CalendarEvent) {
    await patchCalendarEvent(event, { completedAt: event.completedAt ? null : new Date().toISOString() });
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
    <div className={`labApp ${activeView === "brain" ? "brainApp" : ""}`}>
      <aside className="labSidebar">
        <div className="brand">
          <div className="brandMark">MV</div>
          <div>
            <h1>MVOG Lab</h1>
            <p>Cerebro de ideas</p>
          </div>
        </div>

        <nav className="nav" aria-label="Secciones">
          {(["brain", "calendar", "board", "analytics"] as const).map((view) => (
            <button key={view} type="button" aria-selected={activeView === view} onClick={() => setActiveView(view)}>
              {viewLabel(view)}
              <span>{view === "brain" ? state.ideas.length : view === "calendar" ? state.calendarEvents.length : "live"}</span>
            </button>
          ))}
        </nav>

        <div className="sessionBox">
          <span>{userEmail}</span>
          <button className="btn ghost" type="button" onClick={onSignOut}>Salir</button>
        </div>
      </aside>

      <main className={`labMain ${activeView === "brain" ? "brainMain" : ""}`}>
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
            {activeView === "brain" && (
              <>
                <button className="btn secondary mobileCalendarAction" type="button" onClick={() => setActiveView("calendar")}>
                  Ver calendario
                </button>
                <button className="btn secondary mobileEventAction" type="button" onClick={() => setEventOpen(true)}>
                  Nuevo evento
                </button>
              </>
            )}
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
                            {visibleTags(idea).slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
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

        {activeView === "calendar" && (
          <CalendarView
            events={state.calendarEvents}
            onCreate={() => setEventOpen(true)}
            onDelete={removeCalendarEvent}
            onMove={moveCalendarEvent}
            onToggleComplete={toggleCalendarEventComplete}
            people={calendarPeople(state, userEmail)}
          />
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

      {eventOpen && (
        <dialog open>
          <CalendarEventForm
            defaultOwner={defaultCalendarOwner(userEmail)}
            onClose={() => setEventOpen(false)}
            onSave={(input) => saveCalendarEvent(input)}
            people={calendarPeople(state, userEmail)}
          />
        </dialog>
      )}
    </div>
  );
}

function CalendarView({
  events,
  onCreate,
  onDelete,
  onMove,
  onToggleComplete,
  people
}: {
  events: CalendarEvent[];
  onCreate: () => void;
  onDelete: (event: CalendarEvent) => void;
  onMove: (event: CalendarEvent, nextDate: string) => void;
  onToggleComplete: (event: CalendarEvent) => void;
  people: CalendarPerson[];
}) {
  const weekDays = nextSevenDays();
  const weekStart = startOfDay(weekDays[0]);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);
  const weekEvents = events
    .filter((event) => {
      const startsAt = new Date(event.startsAt);
      return startsAt >= weekStart && startsAt < weekEnd;
    })
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  return (
    <section className="calendarPanel">
      <div className="calendarHead">
        <div>
          <p className="eyebrow">Semana</p>
          <h2>Calendario de actividades</h2>
          <p>Ideas, partidos, cumpleaños, reuniones y cualquier cosa que no se debe perder.</p>
        </div>
        <button className="btn" type="button" onClick={onCreate}>Nuevo evento</button>
      </div>
      <div className="weekCalendar">
        {weekDays.map((day) => {
          const dayEvents = weekEvents.filter((event) => sameDay(new Date(event.startsAt), day));
          return (
            <section key={day.toISOString()}>
              <div className="dayHead">
                <span>{weekdayLabel(day)}</span>
                <b>{day.getDate()}</b>
              </div>
              <div className="dayAgenda">
                {dayEvents.length ? dayEvents.map((event) => {
                  const person = people.find((item) => normalizeText(item.name) === normalizeText(event.ownerName));
                  const currentDate = toDateInputValue(new Date(event.startsAt));
                  return (
                    <article className={`calendarEventCard ${event.completedAt ? "done" : ""}`} key={event.id}>
                      <div>
                        <time>{formatActivityTime(event.startsAt)}</time>
                        <strong>{person?.initials || initialsFromName(event.ownerName)}</strong>
                      </div>
                      <b>{event.title}</b>
                      {event.location && <span>{event.location}</span>}
                      {event.notes && <p>{event.notes}</p>}
                      <label className="calendarMove">
                        <span>Mover a</span>
                        <select value={currentDate} onChange={(moveEvent) => onMove(event, moveEvent.target.value)}>
                          {weekDays.map((optionDay) => {
                            const value = toDateInputValue(optionDay);
                            return <option key={value} value={value}>{weekdayLabel(optionDay)} {optionDay.getDate()}</option>;
                          })}
                        </select>
                      </label>
                      <div className="calendarEventActions">
                        <button className="btn ghost" type="button" onClick={() => onToggleComplete(event)}>
                          {event.completedAt ? "Reabrir" : "Completar"}
                        </button>
                        <button className="btn ghost" type="button" onClick={() => onDelete(event)}>Eliminar</button>
                      </div>
                    </article>
                  );
                }) : <small className="emptyDay">Sin eventos</small>}
              </div>
            </section>
          );
        })}
      </div>
    </section>
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
  const [brainMode, setBrainMode] = useState<BrainMode>("spin");

  const phaseOrbits = useMemo(() => statuses.map((status, index) => ({
    status,
    index,
    radius: phaseRingRadius(index, statuses.length),
    tilt: phaseRingTilt(index),
    turn: phaseRingTurn(index)
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
      const orbitTilt = phaseRingTilt(phaseIndex);
      const orbitTurn = phaseRingTurn(phaseIndex);
      const depth = 0.58 + (phaseIndex / Math.max(statuses.length - 1, 1)) * 0.34;

      return {
        idea,
        angle,
        orbitRadius,
        orbitTilt,
        orbitTurn,
        phaseIndex,
        depth
      };
    });
  }, [ideas, statuses]);

  return (
    <div className={`brainWrap ${brainMode === "flat" ? "flatMode" : ""}`}>
      <div className="brainGlow" />
      <div className="brainControls">
        <button className={`brainCtl ${brainMode === "spin" ? "on" : ""}`} type="button" onClick={() => setBrainMode("spin")}>3D girando</button>
        <button className={`brainCtl ${brainMode === "static" ? "on" : ""}`} type="button" onClick={() => setBrainMode("static")}>3D estático</button>
        <button className={`brainCtl ${brainMode === "flat" ? "on" : ""}`} type="button" onClick={() => setBrainMode("flat")}>2D flujo</button>
        <span>Toca una idea para abrir su detalle</span>
      </div>

      {brainMode !== "flat" && (
        <div className="brainLegend">
          {statuses.map((status, index) => (
            <span key={status.id}>
              <i style={{ background: statusColor(status, statuses, index), boxShadow: `0 0 14px ${statusColor(status, statuses, index)}` }} />
              {status.name}
            </span>
          ))}
        </div>
      )}

      {brainMode === "flat" ? (
        <div className="brainFlow2d">
          {statuses.map((status, index) => {
            const ideasInStatus = ideas.filter((idea) => statusIndex(idea, statuses) === index);
            return (
              <section key={status.id} style={{ ["--phase-color" as string]: statusColor(status, statuses, index) }}>
                <div>
                  <i />
                  <strong>{status.name}</strong>
                  <span>{ideasInStatus.length}</span>
                </div>
                {ideasInStatus.map((idea) => (
                  <button key={idea.id} type="button" onClick={() => onOpen(idea)}>
                    <b>{idea.name}</b>
                    <small>{developmentPercent(idea, statuses)}% · {creatorInitialsForIdea(idea) || "MV"}</small>
                  </button>
                ))}
              </section>
            );
          })}
        </div>
      ) : (
        <div className={`brainCanvas ${brainMode === "spin" && !hoverId ? "spinning" : ""}`}>
          <div className="brainSphere">
            <span className="brainCore" />
            {phaseOrbits.map(({ status, index, radius, tilt, turn }) => (
              <span
                aria-hidden="true"
                className="brainRing phaseRing"
                key={status.id}
                style={{
                  ["--ring-color" as string]: statusColor(status, statuses, index),
                  ["--ring-size" as string]: `${radius * 2}px`,
                  ["--ring-tilt" as string]: `${tilt}deg`,
                  ["--ring-turn" as string]: `${turn}deg`
                }}
              />
            ))}
          </div>

          <div className="brainNodes">
            {projected.map(({ idea, angle, orbitRadius, orbitTilt, orbitTurn, phaseIndex, depth }, index) => {
              const status = statuses.find((item) => item.id === idea.statusId || item.name === idea.status);
              const color = statusColor(status, statuses);
              const active = hoverId === idea.id;
              const selected = selectedId === idea.id;
              const scale = active ? 1.12 : 0.62 + depth * 0.52;
              const duration = 26 + phaseIndex * 3 + (index % 3);
              const delay = -(angle / (Math.PI * 2)) * duration;
              const initials = creatorInitialsForIdea(idea);

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
                    ["--orbit-tilt" as string]: `${orbitTilt}deg`,
                    ["--orbit-tilt-back" as string]: `${-orbitTilt}deg`,
                    ["--orbit-turn" as string]: `${orbitTurn}deg`,
                    ["--orbit-turn-back" as string]: `${-orbitTurn}deg`,
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
                  {initials && <span className="creatorBadge">{initials}</span>}
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
      )}

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
  const [researchExpanded, setResearchExpanded] = useState(false);
  const currentStatus = statuses.find((status) => status.id === idea.statusId || status.name === idea.status) || statuses[0];
  const phaseNotesByName = latestPhaseNotesByName(phaseNotes);
  const researchNote = findPhaseNote(phaseNotesByName, "Investigación");
  const developmentNote = findPhaseNote(phaseNotesByName, "desarrollo");
  const testNote = findPhaseNote(phaseNotesByName, "test");
  const productionNote = findPhaseNote(phaseNotesByName, "producción") || findPhaseNote(phaseNotesByName, "produccion");

  useEffect(() => {
    setExpanded("");
    setResearchExpanded(false);
  }, [idea.id]);

  function saveBaseConcept(form: FormData) {
    const notes = String(form.get("notes") || "");
    const conceptStatus = findStatusByName(statuses, "Concepto");
    const patch: Partial<IdeaInput> = { notes };

    if (notes.trim() && conceptStatus && statusIndex(idea, statuses) < statuses.indexOf(conceptStatus)) {
      patch.statusId = conceptStatus.id;
      patch.status = conceptStatus.name;
      patch.developmentProgress = Math.max(developmentPercent(idea, statuses), progressForStatus(conceptStatus, statuses));
    }

    onUpdate(idea, patch);
  }

  function saveStageNote(form: FormData, statusNameHint: string, fallbackSummary: string) {
    const status = findStatusByName(statuses, statusNameHint) || currentStatus;
    const note: IdeaPhaseNote = {
      id: crypto.randomUUID(),
      statusId: status?.id || null,
      statusName: status?.name || statusNameHint,
      summary: String(form.get("summary") || fallbackSummary),
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
        <span>Viabilidad <b>{idea.value}</b></span>
        <span>Dificultad <b>{idea.effort}</b></span>
        <span>Desarrollo <b>{developmentPercent(idea, statuses)}%</b></span>
      </div>
      <div className="horizontalProgress">
        {statuses.map((status, index) => {
          const note = phaseNotesByName.get(status.name);
          const reached = statusIndex(idea, statuses) >= index;
          const active = currentStatus?.id === status.id;
          return (
            <button
              className={`${reached ? "reached" : ""} ${active ? "active" : ""} ${note ? "hasNote" : ""}`}
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
      <label>
        Saltar a cualquier fase
        <select value={currentStatus?.id || ""} onChange={(event) => onMove(idea, event.target.value)}>
          {statuses.map((status) => (
            <option key={status.id} value={status.id}>{status.name}</option>
          ))}
        </select>
      </label>

      <form
        className="detailBlock"
        onSubmit={(event) => {
          event.preventDefault();
          saveBaseConcept(new FormData(event.currentTarget));
        }}
      >
        <div className="blockHead">
          <div>
            <h4>Concepto base</h4>
            <p>La primera explicación clara de la idea. Al guardarlo, la idea pasa a concepto explicado.</p>
          </div>
          <button className="btn secondary" type="submit">Guardar concepto</button>
        </div>
        <textarea key={idea.id} name="notes" defaultValue={idea.notes} placeholder="Explica qué es, para quién es y qué problema resuelve." />
      </form>

      <form
        className="detailBlock"
        onSubmit={(event) => {
          event.preventDefault();
          saveStageNote(new FormData(event.currentTarget), "Investigación", "Investigación actualizada");
          event.currentTarget.reset();
        }}
      >
        <div className="blockHead">
          <div>
            <h4>Investigación</h4>
            <p>Mercado, competencia, señales, riesgos y aprendizajes.</p>
          </div>
          <button className="btn secondary" type="submit">Guardar investigación</button>
        </div>
        {researchNote && (
          <div className={`notePreview ${researchExpanded ? "open" : ""}`}>
            <p>{researchNote.details || researchNote.summary}</p>
            {(researchNote.details || researchNote.summary).length > 280 && (
              <button className="btn ghost" type="button" onClick={() => setResearchExpanded((value) => !value)}>
                {researchExpanded ? "Mostrar menos" : "Mostrar más"}
              </button>
            )}
          </div>
        )}
        <input name="summary" placeholder="Resumen corto de la investigación" />
        <textarea name="details" placeholder="Escribe o pega aquí la investigación completa." />
      </form>

      <div className="stageGrid">
        <StageLinkForm
          note={developmentNote}
          title="Desarrollo"
          description="Enlace del modelo, prototipo o repositorio en desarrollo."
          onSave={(form) => saveStageNote(form, "desarrollo", "Desarrollo actualizado")}
        />
        <StageLinkForm
          note={testNote}
          title="Test"
          description="Enlace de pruebas y notas de validación."
          onSave={(form) => saveStageNote(form, "test", "Test actualizado")}
        />
        <StageLinkForm
          note={productionNote}
          title="Producción"
          description="Enlace de la versión publicada y notas operativas."
          onSave={(form) => saveStageNote(form, "producción", "Producción actualizada")}
        />
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
          <label>Viabilidad<select name="value" defaultValue={idea.value}><option>Alto</option><option>Medio</option><option>Bajo</option></select></label>
          <label>Dificultad<select name="effort" defaultValue={idea.effort}><option>Alta</option><option>Media</option><option>Baja</option></select></label>
        </div>
        <button className="btn secondary" type="submit">Guardar evaluación</button>
      </form>

      <div className="tags">
        {visibleTags(idea).length ? visibleTags(idea).map((tag) => <span key={tag}>{tag}</span>) : <span>Sin etiquetas</span>}
      </div>
    </section>
  );
}

function StageLinkForm({
  description,
  note,
  onSave,
  title
}: {
  description: string;
  note?: IdeaPhaseNote;
  onSave: (form: FormData) => void;
  title: string;
}) {
  return (
    <form
      className="stageLinkCard"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(new FormData(event.currentTarget));
        event.currentTarget.reset();
      }}
    >
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      {note && (
        <div className="stageCurrent">
          {note.link && <a href={note.link} target="_blank" rel="noreferrer">Abrir enlace guardado</a>}
          <p>{note.details || note.summary}</p>
        </div>
      )}
      <input name="link" placeholder="https://..." />
      <textarea name="details" placeholder="Notas, estado, bloqueos o siguiente paso." />
      <input name="summary" placeholder="Resumen corto opcional" />
      <button className="btn secondary" type="submit">Guardar {title.toLowerCase()}</button>
    </form>
  );
}

function CalendarEventForm({
  defaultOwner,
  onClose,
  onSave,
  people
}: {
  defaultOwner: CalendarPerson;
  onClose: () => void;
  onSave: (input: CalendarEventInput) => void;
  people: CalendarPerson[];
}) {
  const [quickText, setQuickText] = useState("");
  const [draft, setDraft] = useState(() => calendarDraftFromQuickText("", defaultOwner, people));

  function applyQuickText(value: string) {
    setQuickText(value);
    setDraft(calendarDraftFromQuickText(value, defaultOwner, people));
  }

  return (
    <form
      className="modal calendarModal"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const ownerName = String(data.get("ownerName") || defaultOwner.name);
        const owner = people.find((person) => person.name === ownerName) || defaultOwner;
        const date = String(data.get("date") || draft.date);
        const time = String(data.get("time") || draft.time);
        const startsAt = new Date(`${date}T${time || "09:00"}:00`);
        onSave({
          title: String(data.get("title") || "Evento"),
          ownerName: owner.name,
          ownerEmail: owner.email,
          startsAt: startsAt.toISOString(),
          endsAt: null,
          location: String(data.get("location") || ""),
          notes: String(data.get("notes") || "")
        });
      }}
    >
      <div className="modalHead">
        <h3>Nuevo evento</h3>
        <button className="btn ghost" type="button" onClick={onClose}>Cerrar</button>
      </div>
      <label>Frase rápida
        <textarea
          onChange={(event) => applyQuickText(event.target.value)}
          placeholder="Ej: Tengo partido de padel pasado mañana a las 20:00 en Establos"
          value={quickText}
        />
      </label>
      <div className="split">
        <label>Título<input name="title" onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} required value={draft.title} /></label>
        <label>Persona
          <select name="ownerName" onChange={(event) => setDraft((current) => ({ ...current, ownerName: event.target.value }))} value={draft.ownerName}>
            {people.map((person) => <option key={person.name}>{person.name}</option>)}
          </select>
        </label>
      </div>
      <div className="split">
        <label>Fecha<input name="date" onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))} required type="date" value={draft.date} /></label>
        <label>Hora<input name="time" onChange={(event) => setDraft((current) => ({ ...current, time: event.target.value }))} type="time" value={draft.time} /></label>
      </div>
      <label>Lugar<input name="location" onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))} value={draft.location} /></label>
      <label>Notas<textarea name="notes" onChange={(event) => setDraft((current) => ({ ...current, notes: event.target.value }))} value={draft.notes} /></label>
      <button className="btn" type="submit">Guardar evento</button>
    </form>
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
  const dailyActivity = todaysActivity(state.activity);

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
      <section className="dailyReport">
        <div>
          <p className="eyebrow">Hoy</p>
          <h3>Informe de avances</h3>
          <span>Se reinicia cada día a las 12:00 a. m.</span>
        </div>
        {dailyActivity.length ? (
          <ol>
            {dailyActivity.map((item) => (
              <li key={item.id}>
                <time>{formatActivityTime(item.at)}</time>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        ) : (
          <p className="empty">Todavía no hay avances registrados hoy.</p>
        )}
      </section>
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

function nextSevenDays() {
  const today = new Date();
  const firstDay = startOfDay(today);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + index);
    return date;
  });
}

function startOfDay(value: Date) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

function sameDay(left: Date, right: Date) {
  return startOfDay(left).getTime() === startOfDay(right).getTime();
}

function weekdayLabel(value: Date) {
  return new Intl.DateTimeFormat("es", { weekday: "short" }).format(value).replace(".", "");
}

function calendarPeople(state: ControlRoomState, userEmail: string): CalendarPerson[] {
  void state;
  void userEmail;
  return [defaultCalendarOwner("mjcalvo92@gmail.com"), defaultCalendarOwner("vinelis13@gmail.com")];
}

function defaultCalendarOwner(email: string): CalendarPerson {
  const normalized = email.trim().toLowerCase();
  if (normalized === "vinelis13@gmail.com") return { name: "Vinelis Garcia", email: normalized, initials: "VG" };
  if (normalized === "mjcalvo92@gmail.com") return { name: "Manuel Onate", email: normalized, initials: "MO" };
  return defaultCalendarOwner("mjcalvo92@gmail.com");
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "MV";
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}

function calendarDraftFromQuickText(text: string, defaultOwner: CalendarPerson, people: CalendarPerson[]) {
  const lower = normalizeText(text);
  const owner = people.find((person) => lower.includes(normalizeText(person.name).split(" ")[0])) || defaultOwner;
  const date = parseQuickDate(lower);
  const time = parseQuickTime(lower);
  const location = text.match(/\ben\s+([^,.;]+)/i)?.[1]?.trim() || "";
  const title = cleanQuickTitle(text) || "Evento";

  return {
    title,
    ownerName: owner.name,
    date: toDateInputValue(date),
    time,
    location,
    notes: text
  };
}

function parseQuickTime(lowerText: string) {
  const match = lowerText.match(/(?:a las|las|hora|sobre las|a eso de las)\s+(\d{1,2})(?::|\.|h)?(\d{2})?\s*(am|pm)?/);
  const clockMatch = match || lowerText.match(/\b(\d{1,2}):(\d{2})\s*(am|pm)?\b/);
  const meridiemMatch = clockMatch ? null : lowerText.match(/\b(\d{1,2})\s*(am|pm)\b/);
  const selected = clockMatch || meridiemMatch;

  if (!selected) return "09:00";

  let hour = Number(selected[1]);
  const minute = Number(meridiemMatch ? "0" : selected[2] || "0");
  const meridiem = meridiemMatch ? selected[2] : selected[3];

  if (meridiem === "pm" && hour < 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;
  if (hour > 23 || minute > 59) return "09:00";

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function parseQuickDate(lowerText: string) {
  const date = new Date();
  if (lowerText.includes("pasado manana") || lowerText.includes("pasado mañana")) {
    date.setDate(date.getDate() + 2);
    return date;
  }
  if (lowerText.includes("manana") || lowerText.includes("mañana")) {
    date.setDate(date.getDate() + 1);
    return date;
  }
  if (lowerText.includes("hoy")) return date;

  const dayMatch = lowerText.match(/(?:dia|el)\s+(\d{1,2})/);
  if (dayMatch) {
    const targetDay = Number(dayMatch[1]);
    date.setDate(targetDay);
    if (startOfDay(date).getTime() < startOfDay(new Date()).getTime()) {
      date.setMonth(date.getMonth() + 1);
    }
  }
  return date;
}

function cleanQuickTitle(text: string) {
  return text
    .replace(/\b(tengo|tiene|manuel|vinelis)\b/gi, "")
    .replace(/\b(pasado mañana|pasado manana|mañana|manana|hoy|el día \d{1,2}|el dia \d{1,2}|día \d{1,2}|dia \d{1,2})\b/gi, "")
    .replace(/\b(a las|las|hora|sobre las|a eso de las)\s+\d{1,2}(?::|\.|h)?\d{0,2}\s*(am|pm)?\b/gi, "")
    .replace(/\b\d{1,2}:\d{2}\s*(am|pm)?\b/gi, "")
    .replace(/\b\d{1,2}\s*(am|pm)\b/gi, "")
    .replace(/\ben\s+[^,.;]+/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function toDateInputValue(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function moveEventToDate(isoValue: string, nextDate: string) {
  const source = new Date(isoValue);
  const [year, month, day] = nextDate.split("-").map(Number);
  source.setFullYear(year, month - 1, day);
  return source.toISOString();
}

function calendarEventFromInput(input: CalendarEventInput): CalendarEvent {
  return {
    id: crypto.randomUUID(),
    ...input,
    createdAt: new Date().toISOString()
  };
}

function progressFor(idea: Idea, statuses: Status[]) {
  const index = statusIndex(idea, statuses);
  return statuses.length <= 1 ? 100 : Math.round((index / (statuses.length - 1)) * 100);
}

function progressForStatus(status: Status, statuses: Status[]) {
  const index = Math.max(0, statuses.findIndex((item) => item.id === status.id || item.name === status.name));
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

function phaseRingTilt(index: number) {
  return [-58, -36, -18, 0, 18, 36, 58][index % 7];
}

function phaseRingTurn(index: number) {
  return [0, 28, -34, 62, -62, 88, -88][index % 7];
}

function latestPhaseNotesByName(notes: IdeaPhaseNote[]) {
  const byName = new Map<string, IdeaPhaseNote>();
  notes.forEach((note) => {
    byName.set(note.statusName, note);
  });
  return byName;
}

function findPhaseNote(notes: Map<string, IdeaPhaseNote>, namePart: string) {
  const normalized = normalizeText(namePart);
  return [...notes.entries()].find(([name]) => normalizeText(name).includes(normalized))?.[1];
}

function findStatusByName(statuses: Status[], namePart: string) {
  const normalized = normalizeText(namePart);
  return statuses.find((status) => normalizeText(status.name).includes(normalized));
}

function normalizeText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function todaysActivity(activity: ControlRoomState["activity"]) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return activity
    .filter((item) => new Date(item.at).getTime() >= start.getTime())
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
}

function formatActivityTime(value: string) {
  return new Intl.DateTimeFormat("es", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function visibleTags(idea: Idea) {
  return idea.tags.filter((tag) => !tag.startsWith("creator:"));
}

function creatorInitialsForIdea(idea: Idea) {
  const creatorTag = idea.tags.find((tag) => tag.startsWith("creator:"));
  return creatorTag?.replace("creator:", "").slice(0, 3).toUpperCase() || "";
}

function creatorInitialsForEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (normalized === "mjcalvo92@gmail.com") return "MO";
  if (normalized === "vinelis13@gmail.com") return "VG";
  return normalized.slice(0, 2).toUpperCase();
}

function statusColor(status: Status | undefined, statuses: Status[], fallbackIndex = 0) {
  const index = status ? Math.max(0, statuses.findIndex((item) => item.id === status.id || item.name === status.name)) : fallbackIndex;
  return STATUS_COLORS[index % STATUS_COLORS.length];
}

function viewLabel(view: ViewKey) {
  if (view === "brain") return "Cerebro";
  if (view === "detail") return "Detalle";
  if (view === "board") return "Tablero";
  if (view === "calendar") return "Calendario";
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
