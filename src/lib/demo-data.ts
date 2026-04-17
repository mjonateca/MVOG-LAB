import type { ControlRoomState } from "./types";

const now = Date.now();
const daysAgo = (days: number) => new Date(now - days * 86_400_000).toISOString();

export const demoState: ControlRoomState = {
  statuses: [
    { id: "inbox", name: "Inbox", position: 10, wipLimit: 9 },
    { id: "design", name: "Diseño", position: 20, wipLimit: 4 },
    { id: "structure", name: "Estructura", position: 30, wipLimit: 4 },
    { id: "development", name: "En desarrollo", position: 40, wipLimit: 3 },
    { id: "test", name: "Test", position: 50, wipLimit: 3 },
    { id: "process", name: "En proceso", position: 60, wipLimit: 3 },
    { id: "sales", name: "En venta", position: 70, wipLimit: 99 }
  ],
  roles: [
    { id: "creator", name: "Creador digital" },
    { id: "finance", name: "Financiero" },
    { id: "product", name: "Producto" },
    { id: "user", name: "Usuario" }
  ],
  users: [
    { id: "laura", name: "Laura Pérez", email: "laura@equipo.local", role: "Creador digital", verified: true, verificationCode: "218934" },
    { id: "miguel", name: "Miguel Santos", email: "miguel@equipo.local", role: "Financiero", verified: false, verificationCode: "640129" },
    { id: "ana", name: "Ana Torres", email: "ana@equipo.local", role: "Producto", verified: true, verificationCode: "805421" }
  ],
  ideas: [
    {
      id: "idea-inventory",
      name: "Inventario predictivo para colmados",
      market: "Colmados y minimarkets",
      ownerId: "laura",
      owner: "Laura Pérez",
      statusId: "design",
      status: "Diseño",
      value: "Alto",
      effort: "Media",
      notes: "Detectar productos que se agotan, sugerir compras y alertar sobre inventario muerto.",
      prompt: "Define un MVP de inventario predictivo para colmados con módulos, datos mínimos y pantallas clave.",
      tags: ["IA", "Inventario", "Alertas"],
      updatedAt: daysAgo(1)
    },
    {
      id: "idea-collections",
      name: "Cobranza con WhatsApp para talleres",
      market: "Talleres mecánicos",
      ownerId: "miguel",
      owner: "Miguel Santos",
      statusId: "structure",
      status: "Estructura",
      value: "Medio",
      effort: "Baja",
      notes: "Controlar facturas pendientes y generar mensajes de seguimiento por antigüedad.",
      prompt: "Crea un flujo de cobranza amable para talleres, con plantillas de WhatsApp y tablero de pendientes.",
      tags: ["WhatsApp", "Pagos", "CRM"],
      updatedAt: daysAgo(3)
    },
    {
      id: "idea-agenda",
      name: "Agenda anti-huecos para clínicas",
      market: "Clínicas pequeñas",
      ownerId: "ana",
      owner: "Ana Torres",
      statusId: "development",
      status: "En desarrollo",
      value: "Alto",
      effort: "Alta",
      notes: "Predecir cancelaciones y llenar espacios con lista de espera antes de perder ingresos.",
      prompt: "Diseña la arquitectura de una agenda anti-huecos con predicción, lista de espera y mensajes automáticos.",
      tags: ["SaaS", "Agenda", "IA"],
      updatedAt: daysAgo(4)
    },
    {
      id: "idea-trading-bot",
      name: "Bot de trading",
      market: "Traders independientes y equipos internos",
      ownerId: "miguel",
      owner: "Miguel Santos",
      statusId: "inbox",
      status: "Inbox",
      value: "Alto",
      effort: "Alta",
      notes: "Sistema para analizar señales, definir reglas de entrada/salida, simular estrategias y operar con controles de riesgo.",
      prompt: "Diseña un bot de trading con backtesting, gestión de riesgo, bitácora de operaciones y alertas antes de cualquier ejecución real.",
      tags: ["Trading", "IA", "Riesgo"],
      updatedAt: daysAgo(5)
    },
    {
      id: "idea-ibarber",
      name: "Ibarber",
      market: "Barberías y salones pequeños",
      ownerId: "laura",
      owner: "Laura Pérez",
      statusId: "design",
      status: "Diseño",
      value: "Alto",
      effort: "Media",
      notes: "App para reservas, turnos, recordatorios, catálogo de servicios, clientes frecuentes y control simple de ingresos.",
      prompt: "Estructura el MVP de Ibarber con agenda, perfiles de barberos, pagos, recordatorios y panel de métricas del negocio.",
      tags: ["Reservas", "Barbería", "SaaS"],
      updatedAt: daysAgo(6)
    },
    {
      id: "idea-padel",
      name: "Organizador partidos pádel",
      market: "Clubes, grupos privados y jugadores de pádel",
      ownerId: "ana",
      owner: "Ana Torres",
      statusId: "structure",
      status: "Estructura",
      value: "Medio",
      effort: "Media",
      notes: "Organizar partidos por nivel, disponibilidad, pistas, pagos compartidos y confirmaciones automáticas.",
      prompt: "Define pantallas y reglas para organizar partidos de pádel con ranking, disponibilidad, pagos y sustituciones.",
      tags: ["Deporte", "Reservas", "Comunidad"],
      updatedAt: daysAgo(7)
    },
    {
      id: "idea-agentic-daily",
      name: "Modelo agéntico diario para ideas",
      market: "Operación interna MVOG",
      ownerId: "laura",
      owner: "Laura Pérez",
      statusId: "development",
      status: "En desarrollo",
      value: "Alto",
      effort: "Alta",
      notes: "Agente que revise diariamente el repositorio, proponga próximos pasos, mejore prompts y detecte ideas bloqueadas.",
      prompt: "Diseña un agente diario que lea el tablero, priorice ideas, genere tareas, actualice prompts y produzca un resumen accionable.",
      tags: ["Agentes", "Automatización", "Operaciones"],
      updatedAt: daysAgo(8)
    },
    {
      id: "idea-mvog-website",
      name: "Página web que venda los servicios MVOG",
      market: "Clientes potenciales de MVOG",
      ownerId: "ana",
      owner: "Ana Torres",
      statusId: "process",
      status: "En proceso",
      value: "Alto",
      effort: "Media",
      notes: "Web comercial para explicar servicios, casos de uso, captación de leads y posicionamiento de MVOG.",
      prompt: "Crea una arquitectura de página web para vender servicios MVOG con propuesta de valor, secciones, CTA y embudo de contacto.",
      tags: ["Web", "Marketing", "Ventas"],
      updatedAt: daysAgo(9)
    },
    {
      id: "idea-instagram-casa-174",
      name: "Agente Instagram Casa 174",
      market: "Casa 174 y gestión de redes sociales",
      ownerId: "laura",
      owner: "Laura Pérez",
      statusId: "design",
      status: "Diseño",
      value: "Medio",
      effort: "Media",
      notes: "Agente para planificar contenido, responder mensajes, detectar leads y mantener una línea editorial en Instagram.",
      prompt: "Diseña un agente de Instagram para Casa 174 con calendario de contenido, respuestas, clasificación de leads y métricas.",
      tags: ["Instagram", "Agentes", "Leads"],
      updatedAt: daysAgo(10)
    }
  ],
  activity: [
    { id: "act-4", at: daysAgo(5), text: "Se agregaron nuevas ideas estratégicas al repositorio MVOG." },
    { id: "act-1", at: daysAgo(1), text: "Inventario predictivo para colmados entró en Diseño." },
    { id: "act-2", at: daysAgo(3), text: "Cobranza con WhatsApp para talleres pasó a Estructura." },
    { id: "act-3", at: daysAgo(4), text: "Agenda anti-huecos para clínicas está En desarrollo." }
  ]
};
