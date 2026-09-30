# Checo's Burger — carta digital

## Qué es
Carta digital de Checo's Burger. Se abre desde el celular, en la mesa,
con la mano ocupada. Prioridad: leer precios y armar el pedido rápido.
Dos cartas según la hora: desayunos y hamburguesas. El pedido sale por
WhatsApp. Mockup navegable, sin backend.

## Stack
HTML + CSS + JavaScript vanilla. Sin build obligatorio, sin frameworks.
Tailwind está precompilado: css/tailwind.css se versiona y se regenera
a mano solo cuando cambian clases (comando en README.md).
Si algo parece necesitar una librería, propónmelo antes: casi siempre no.

## Estructura
index.html            una sola página
css/styles.css        estilos de componentes, tokens en :root al inicio
css/tailwind.css      utilidades generadas, no editar a mano
tailwind.config.js    paleta y fuentes de las utilidades
js/data.js            catálogo: productos, precios, categorías. Fuente única.
js/horarios.js        turnos (TURNOS) y zona horaria del negocio
js/carrito.js         estado del pedido
js/recomendador.js    lógica de sugerencias
js/app.js             render y wiring de eventos
tests/                node --test tests/horarios.test.cjs
assets/images/        fotos de producto en kebab-case
.devcontainer/        configuración de GitHub Codespaces

Reglas:
- Precios y nombres SOLO en data.js. Nada hardcodeado en el HTML.
- Horarios SOLO en TURNOS de horarios.js, en minutos desde medianoche.
- app.js no pasa de 400 líneas.
- Rutas de imagen: assets/images/<slug>.jpg, mismo slug que en data.js.

## Horarios predeterminados (America/Lima, cierre exclusivo)
- Desayunos: 07:00–11:00
- Hamburguesas: 17:00–00:40

## Correr
Local: python3 -m http.server 8093
Codespaces: el servidor arranca solo en el puerto 8093.

## Visual
Antes de tocar CSS, lee ~/.claude/skills/mockup/estilos/checos-burger.md.
Si ese archivo no existe todavía, avísame en vez de improvisar.

## No hacer
- Emojis, en ningún lado.
- Cambiar precios o nombres de productos por tu cuenta.
- Renombrar imágenes.
- Animaciones de entrada al hacer scroll.
