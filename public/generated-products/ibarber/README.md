# IBARBER

Prototipo HTML funcional para operar la agenda diaria de una barberia pequena con confirmaciones, waitlist, riesgo de no-show y reservas demo.

## Como abrirlo

Abre `generated-products/ibarber/index.html` directamente en el navegador. No requiere backend, instalacion ni credenciales.

## Flujo demo recomendado

1. Filtra por un barbero para ver su dia.
2. Confirma una cita en riesgo y observa como bajan las perdidas estimadas.
3. Marca una cita como no-show y luego llena el cupo desde la lista de espera.
4. Crea una reserva nueva usando el formulario.
5. Cambia la politica de deposito para ver el impacto operativo.

## Decisiones tomadas

- El MVP prioriza el flujo diario de una barberia de 1 a 5 sillas.
- El valor central es reducir no-shows con recordatorios, confirmacion y waitlist.
- La demo evita pagos reales y APIs externas; simula el deposito como regla de negocio.
- El copy esta escrito para el operador final, no como descripcion tecnica.

## Proximos pasos

- Validar el prototipo con tres barberias piloto.
- Medir no-shows, cupos recuperados y tiempo ahorrado por semana.
- Probar mensajes de WhatsApp con confirmacion 24h y 4h antes.
- Definir si el primer producto real usa Stripe, WhatsApp Cloud API y Supabase.
