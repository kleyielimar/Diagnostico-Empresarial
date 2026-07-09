# Dashboard vivo del funnel de recursos

Este dashboard fue creado para la tarea 06 del reto.

## Fuente real conectada

- Supabase: `https://nrbrgovhgrrrwhnavszp.supabase.co`
- Tabla de calculadora: `calculadora_horas_leads`
- Tabla de diagnostico: `diagnostico_orden_leads`
- Funcion publica segura recomendada: `dashboard_funnel_public_rows`

## Que mide

- Leads capturados entre calculadora y diagnostico.
- Movimiento de los ultimos 7 dias.
- Horas perdidas detectadas por la calculadora.
- Fuga mensual estimada.
- Avance desde recurso gratuito hacia diagnostico.
- Niveles de orden detectados en el diagnostico.

## Como se actualiza

La pagina consulta Supabase al cargar y vuelve a consultar cada 30 segundos. Tambien tiene un boton para actualizar manualmente.

## Privacidad

El dashboard intenta leer primero la funcion `dashboard_funnel_public_rows`, que devuelve datos sanitizados para metricas y no expone correos completos. Si esa funcion todavia no existe, intenta la lectura directa como respaldo.

## URL publica

https://kleyielimar.github.io/Diagnostico-Empresarial/dashboard-funnel-kleyi/
