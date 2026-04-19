# IBARBER - Prompt ultraoptimizado

## 1. Nombre de la idea
IBARBER.

## 2. Problema que resuelve
Barberias pequenas pierden dinero por no-shows, huecos muertos en agenda y reservas coordinadas por mensajes dispersos.

## 3. Usuario objetivo
Duenos de barberias de 1 a 5 sillas que venden por WhatsApp, Instagram y referidos, y necesitan agenda simple sin una suite pesada.

## 4. Insight clave de investigacion
El mercado ya valida booking, pagos y recordatorios, pero los productos grandes se sienten costosos o complejos para barberias pequenas. La ventaja esta en una experiencia WhatsApp-first con confirmacion, waitlist y deposito opcional.

## 5. MVP exacto a construir en HTML
Una consola local que simule el dia operativo de una barberia: agenda por barbero, reservas, clientes en espera, confirmaciones, no-shows evitados, ingresos protegidos y mensajes listos para WhatsApp.

## 6. Flujo principal del usuario
El dueno revisa la agenda del dia, filtra por barbero, confirma citas, libera cupos sin confirmar, mueve clientes de lista de espera y crea una nueva reserva.

## 7. Datos demo necesarios
Servicios con duracion/precio/deposito, tres barberos, citas del dia, clientes recurrentes, lista de espera y metricas de no-show.

## 8. Componentes/pantallas
Dashboard operativo, filtros por barbero, tarjetas de citas, lista de espera, formulario de nueva reserva, simulador de impacto y panel de mensajes.

## 9. Interacciones obligatorias
Confirmar cita, marcar no-show, llenar cupo desde waitlist, crear reserva, filtrar agenda, cambiar politica de deposito y copiar mensaje demo.

## 10. Reglas de negocio
Las citas sin confirmar cerca de la hora se consideran en riesgo. Un deposito reduce perdida estimada. El cupo liberado se ofrece primero al cliente de waitlist compatible con el servicio.

## 11. Criterios de aceptacion
El HTML abre directo sin backend, funciona en movil y desktop, tiene datos realistas, actualiza metricas en pantalla y permite probar el flujo principal sin APIs externas.

## 12. Restricciones visuales y tecnicas
HTML, CSS y JavaScript vanilla. Sin npm, sin backend, sin credenciales, sin links externos obligatorios. Primera pantalla debe ser la consola operativa, no una landing page.

## 13. Que NO construir todavia
Pagos reales, integracion WhatsApp API, autenticacion, base de datos, multi-sucursal, marketplace de clientes o app nativa.

## 14. Carpeta y archivos de salida
`generated-products/ibarber/index.html`, `generated-products/ibarber/README.md` y este `PROMPT.md`.
