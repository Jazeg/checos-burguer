# Checo's Burger — carta digital

## Qué es
Carta digital de Checo's Burger. Se abre desde el celular, en la mesa,
con la mano ocupada. Prioridad: leer precios y armar el pedido rápido.
Tres cartas según la hora: desayunos, almuerzos y hamburguesas. El pedido sale por
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
js/recomendador.js    lógica de sugerencias (sin DOM)
js/carta.js           render de la carta: categorías, tarjetas, subgrupos, ficha
js/hoja.js            hoja de pedido, datos de entrega, contacto guardado
js/recomendador-vista.js  pasos y resultados de "¿No sabes qué pedir?"
js/app.js             arranque, eventos y cambio de turno
tests/                node --test tests/horarios.test.cjs
assets/desayuno/      imágenes de la carta de desayunos
assets/almuerzo/      imágenes de la carta de almuerzos (vacía por ahora)
assets/cena/          fotos de la carta de hamburguesas, .webp, en una
                      subcarpeta por sección (hamburguesas/, salchipapas/...)
assets/comun/         carta-checos.svg: relleno para productos sin foto,
                      compartido por los tres turnos
originales/           PNG/JPG originales del cliente. En .gitignore: no se publica
.nojekyll             GitHub Pages sirve los archivos tal cual, sin Jekyll

Reglas:
- Precios y nombres SOLO en data.js. Nada hardcodeado en el HTML.
- Horarios SOLO en TURNOS de horarios.js, en minutos desde medianoche.
- Ningún archivo JS pasa de ~600 líneas (data.js aparte: es catálogo).
  Si uno crece, se divide por responsabilidad en otro <script>, sin build.
  Orden de carga en index.html: data, horarios, carrito, recomendador,
  carta, hoja, recomendador-vista, app.
- Imágenes por turno y sección:
  assets/<desayuno|almuerzo|cena>/<seccion>/<Nombre>.webp.
  <seccion> es el id de la sección en data.js (hamburguesas, salchipapas,
  club-sandwiches...): minúsculas, sin tildes ni espacios. La carpeta se crea
  cuando entra la primera foto de esa sección, no antes.
  Va según la sección donde está el plato hoy, no según su id: los
  sandwiches-N de Filete, Deshilachado y Chorizo van en hamburguesas/. Si un
  plato cambia de sección, su foto se mueve de carpeta (sin renombrarla) y se
  actualiza la ruta en data.js.
  <Nombre> va tal como lo entrega el cliente (espacios, mayúsculas y erratas
  incluidos).
  Las secciones compartidas (jugos, jugos-leche, bebidas, bebidas-calientes)
  van en assets/comun/<seccion>/, no dentro de un turno.
  Sin foto: assets/comun/carta-checos.svg. Nada de fotos de referencia o stock.
- Toda foto nueva se publica en .webp, máximo 800 px de lado, calidad 80
  (unos 50–80 KB). El original va a originales/<turno>/<seccion>/, la
  misma estructura que assets/.

## Carta de hamburguesas (cena)
Fuente: la lista de datos del cliente, precios en soles. Orden de secciones:
Hamburguesas, Broaster, Salchipapas, Club sándwiches, Enchiladas con queso,
Alitas BBQ, Jugos, Jugos con leche, Bebidas frías, Bebidas calientes,
Extras, Combos.
- Hamburguesas lleva subgrupos (campo `subgrupo` de cada plato): Hamburguesa
  de casa, Filete de pollo, Pollo deshilachado, Chorizo y Pollo crispy.
  Se muestran como subtítulo (.subgroup-heading) dentro de la sección, en el
  orden de data.js. Cualquier sección puede usar `subgrupo`.
- Los ids de plato no cambian aunque cambie su sección (los de Filete,
  Deshilachado y Chorizo siguen siendo sandwiches-N).
- Los ítems marcados [PENDIENTE] no se publican: van en COMBOS_PENDIENTES,
  fuera de CARTA, hasta que el cliente los confirme. Hoy: combos 4, 9, 10 y 13.
- Jugos, Jugos con leche, Bebidas frías y Bebidas calientes se comparten con
  desayunos y almuerzos: se editan una sola vez en CARTA.

## Horarios predeterminados (America/Lima, cierre exclusivo)
- Desayunos: 07:00–11:00
- Almuerzos: 11:00–15:00
- Hamburguesas: 17:00–00:40

## Correr
Local: python3 -m http.server 8093
Publicación: GitHub Pages desde la raíz de main. Rutas siempre relativas
(assets/..., nunca /assets/...) y con mayúsculas exactas: Pages distingue.

## Visual
Antes de tocar CSS, lee ~/.claude/skills/mockup/estilos/checos-burger.md.
Si ese archivo no existe todavía, avísame en vez de improvisar.

## No hacer
- Emojis, en ningún lado.
- Cambiar precios o nombres de productos por tu cuenta.
- Renombrar imágenes.
- Animaciones de entrada al hacer scroll.
