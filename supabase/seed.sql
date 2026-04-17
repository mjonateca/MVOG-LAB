insert into public.roles (name)
values ('Creador digital'), ('Financiero'), ('Producto'), ('Usuario')
on conflict (name) do nothing;

insert into public.statuses (name, position, wip_limit)
values
  ('Inbox', 10, 9),
  ('Diseño', 20, 4),
  ('Estructura', 30, 4),
  ('En desarrollo', 40, 3),
  ('Test', 50, 3),
  ('En proceso', 60, 3),
  ('En venta', 70, 99)
on conflict (name) do update
set position = excluded.position,
    wip_limit = excluded.wip_limit;

with role_lookup as (
  select id, name from public.roles
)
insert into public.app_users (name, email, role_id, verified, verification_code)
values
  ('Laura Pérez', 'laura@equipo.local', (select id from role_lookup where name = 'Creador digital'), true, '218934'),
  ('Miguel Santos', 'miguel@equipo.local', (select id from role_lookup where name = 'Financiero'), false, '640129'),
  ('Ana Torres', 'ana@equipo.local', (select id from role_lookup where name = 'Producto'), true, '805421')
on conflict (email) do nothing;

with user_lookup as (
  select id, name from public.app_users
), status_lookup as (
  select id, name from public.statuses
), inserted as (
  insert into public.ideas (name, market, owner_id, status_id, value, effort, notes, prompt)
  values
    (
      'Inventario predictivo para colmados',
      'Colmados y minimarkets',
      (select id from user_lookup where name = 'Laura Pérez'),
      (select id from status_lookup where name = 'Diseño'),
      'Alto',
      'Media',
      'Detectar productos que se agotan, sugerir compras y alertar sobre inventario muerto.',
      'Define un MVP de inventario predictivo para colmados con módulos, datos mínimos y pantallas clave.'
    ),
    (
      'Cobranza con WhatsApp para talleres',
      'Talleres mecánicos',
      (select id from user_lookup where name = 'Miguel Santos'),
      (select id from status_lookup where name = 'Estructura'),
      'Medio',
      'Baja',
      'Controlar facturas pendientes y generar mensajes de seguimiento por antigüedad.',
      'Crea un flujo de cobranza amable para talleres, con plantillas de WhatsApp y tablero de pendientes.'
    ),
    (
      'Agenda anti-huecos para clínicas',
      'Clínicas pequeñas',
      (select id from user_lookup where name = 'Ana Torres'),
      (select id from status_lookup where name = 'En desarrollo'),
      'Alto',
      'Alta',
      'Predecir cancelaciones y llenar espacios con lista de espera antes de perder ingresos.',
      'Diseña la arquitectura de una agenda anti-huecos con predicción, lista de espera y mensajes automáticos.'
    ),
    (
      'Bot de trading',
      'Traders independientes y equipos internos',
      (select id from user_lookup where name = 'Miguel Santos'),
      (select id from status_lookup where name = 'Inbox'),
      'Alto',
      'Alta',
      'Sistema para analizar señales, definir reglas de entrada/salida, simular estrategias y operar con controles de riesgo.',
      'Diseña un bot de trading con backtesting, gestión de riesgo, bitácora de operaciones y alertas antes de cualquier ejecución real.'
    ),
    (
      'Ibarber',
      'Barberías y salones pequeños',
      (select id from user_lookup where name = 'Laura Pérez'),
      (select id from status_lookup where name = 'Diseño'),
      'Alto',
      'Media',
      'App para reservas, turnos, recordatorios, catálogo de servicios, clientes frecuentes y control simple de ingresos.',
      'Estructura el MVP de Ibarber con agenda, perfiles de barberos, pagos, recordatorios y panel de métricas del negocio.'
    ),
    (
      'Organizador partidos pádel',
      'Clubes, grupos privados y jugadores de pádel',
      (select id from user_lookup where name = 'Ana Torres'),
      (select id from status_lookup where name = 'Estructura'),
      'Medio',
      'Media',
      'Organizar partidos por nivel, disponibilidad, pistas, pagos compartidos y confirmaciones automáticas.',
      'Define pantallas y reglas para organizar partidos de pádel con ranking, disponibilidad, pagos y sustituciones.'
    ),
    (
      'Modelo agéntico diario para ideas',
      'Operación interna MVOG',
      (select id from user_lookup where name = 'Laura Pérez'),
      (select id from status_lookup where name = 'En desarrollo'),
      'Alto',
      'Alta',
      'Agente que revise diariamente el repositorio, proponga próximos pasos, mejore prompts y detecte ideas bloqueadas.',
      'Diseña un agente diario que lea el tablero, priorice ideas, genere tareas, actualice prompts y produzca un resumen accionable.'
    ),
    (
      'Página web que venda los servicios MVOG',
      'Clientes potenciales de MVOG',
      (select id from user_lookup where name = 'Ana Torres'),
      (select id from status_lookup where name = 'En proceso'),
      'Alto',
      'Media',
      'Web comercial para explicar servicios, casos de uso, captación de leads y posicionamiento de MVOG.',
      'Crea una arquitectura de página web para vender servicios MVOG con propuesta de valor, secciones, CTA y embudo de contacto.'
    ),
    (
      'Agente Instagram Casa 174',
      'Casa 174 y gestión de redes sociales',
      (select id from user_lookup where name = 'Laura Pérez'),
      (select id from status_lookup where name = 'Diseño'),
      'Medio',
      'Media',
      'Agente para planificar contenido, responder mensajes, detectar leads y mantener una línea editorial en Instagram.',
      'Diseña un agente de Instagram para Casa 174 con calendario de contenido, respuestas, clasificación de leads y métricas.'
    )
  on conflict do nothing
  returning id, name
)
insert into public.activity (idea_id, message)
select id, name || ' fue cargada como demo inicial.' from inserted;
