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
js/data.js            catálogo: productos, precios, categorías, cremas. Fuente única.
js/desayunos.js       desayuno ejecutivo (solo catálogo corporativo)
js/horarios.js        turnos (TURNOS) y zona horaria del negocio
js/carrito.js         estado del pedido
js/recomendador.js    lógica de sugerencias (sin DOM)
js/carta.js           render de la carta: categorías, tarjetas, subgrupos, ficha
js/personalizar.js    ficha con elección: tamaño, opciones, cremas, cantidad
js/hoja.js            hoja de pedido, datos de entrega, contacto guardado
js/entrega.js         pedido programado: fecha, hora y evento (solo corporativo)
js/recomendador-vista.js  pasos y resultados de "¿No sabes qué pedir?"
js/memoria.js         carrito guardado, pedidos enviados y sección donde estaba
js/historial.js       modal "Mis pedidos": repetir o eliminar pedidos enviados
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
- Precios y nombres SOLO en data.js (y desayunos.js para el desayuno
  ejecutivo). Nada hardcodeado en el HTML.
- Horarios SOLO en TURNOS de horarios.js, en minutos desde medianoche.
- Ningún archivo JS pasa de ~600 líneas (data.js aparte: es catálogo).
  Si uno crece, se divide por responsabilidad en otro <script>, sin build.
  Orden de carga en index.html: data, horarios, carrito, recomendador,
  carta, personalizar, hoja, recomendador-vista, memoria, historial, app. El catálogo
  corporativo carga además desayunos justo después de data y entrega
  justo después de hoja.
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
- Hamburguesas: 17:00–01:00 en el local y recojo en tienda. Delivery hasta
  00:40 (deliveryHasta en TURNOS); desde 00:20 (avisoDelivery) cuenta
  regresiva en la hoja y bajo el selector de turno.
- Tarifas de delivery en NEGOCIO.delivery (céntrica S/ 2, más alejada S/ 3,
  otras zonas por WhatsApp): solo referencia en la hoja y el pie, no se
  suman al total.

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

## Reglas de pedido
- Carta pública (index.html): solo hamburguesas, cantidad con − y +.
  Catálogo corporativo (catalogo-corporativo/, enlace o QR propio): desayuno
  ejecutivo y hamburguesas, cantidad escrita a mano (pedidos de 100 o más).
- El ejecutivo pide a cualquier hora (SIN_HORARIO en horarios.js) y sin el
  corte de delivery. Por defecto el pedido es para hoy y no se muestra
  fecha. Encima del total, "¿Es para una fecha específica o un evento?"
  abre fecha (hoy + 6 en fichas, u otra fecha), hora opcional y evento
  opcional; solo entonces la comanda lleva "Para:" y "Evento:". Se abre solo,
  con mañana, si hoy ya terminó el turno de lo pedido. Programado o fuera de
  su turno sale como "Pedido anticipado". La carta pública sí respeta TURNOS.
- Ficha con elección: al agregar se cierra y aparece el aviso "Agregado
  correctamente". Si el plato lleva cremas y no se eligió ninguna, primero
  pregunta "¿Seguro que lo quieres sin cremas?" dentro de la ficha.
- Salir de la ficha sin agregar el plato: ir a una sugerencia ("Ver todos
  los acompañamientos") siempre pregunta "¿Seguro que quieres salir sin
  agregarlo?"; cerrar (✕, Esc, clic fuera, "Revisar mi pedido") solo si ya
  se eligió algo. Platos simples no preguntan. Si responde "Seguir
  eligiendo", la ficha recuerda a dónde quería ir y lo lleva ahí al agregar. Las confirmaciones van dentro
  de la ficha, nunca con confirm() del navegador.
- Cremas: todas las que el cliente quiera aunque pida una unidad, con un
  contador por crema. La primera porción de cada una es gratis; cada porción
  extra de esa crema suma S/ 0.50 por unidad (CREMA_EXTRA, tope
  MAX_PORCIONES_CREMA).
  Noche: mayonesa, ketchup, mostaza, ají, salsa tártara, guacatay, salsa wolf
  y aceituna, en hamburguesas, broaster, salchipapas, club sándwiches,
  enchiladas, alitas y combos. Desayuno: solo mostaza y ají. Nunca en jugos,
  bebidas ni extras. Se activan con el campo `cremas` de la sección.
- Opciones obligatorias (campo `opciones` de la sección; un plato puede
  pisarlas): Hamburguesas, con todos sus subgrupos, elige Papas (Papas fritas
  o Papas al hilo) y Ensalada (Con ensalada o Sin ensalada). Salchipapas y
  Broaster eligen solo Ensalada. Club sándwiches no elige: van con papas
  fritas. Gaseosa personal y Combos eligen Bebida (OPCION_GASEOSA: Inca
  Kola, Coca-Cola o Del Valle, pequeña de plástico; la de vidrio es solo
  para consumir en el local). Sin elegir todas, la ficha no deja agregar.
- Sugerencias en la ficha: campo "sugerencia" (id de plato) y
  "acompanamientos" (id de sección) en la sección. Desayuno: jugo de naranja
  y Jugos. Cena (pública y ejecutiva): Gaseosa personal y Bebidas frías, en
  todo lo que lleva cremas salvo combos, que ya incluyen gaseosa. Si la
  sugerencia tiene opción, cada valor es su propio botón.
- Ficha sin descripción: no lleva texto de relleno. La nota de ingredientes
  solo sale en la comida.
- Catálogo corporativo: el turno cena se llama "Cenas", con "Hamburguesas"
  debajo en el selector.
- Desayuno: todos los jugos (los de la noche incluidos) en vaso 250 ml S/ 3
  o medio litro S/ 6. Los de la noche se reutilizan con id am-<id>.
- Cada línea del pedido es plato + elección; otra elección, otra línea.
- Memoria en el dispositivo (localStorage, público y ejecutivo por separado):
  el carrito en curso se guarda en cada cambio y se restaura al volver
  (12 h; en el ejecutivo también lo programado); la sección donde estaba
  (2 h); al enviar por WhatsApp el carrito se limpia y el pedido pasa a
  "Mis pedidos" (últimos 20, 90 días). El botón "Mis pedidos" va en la barra
  de categorías y solo aparece si hay pedidos; el modal permite "Pedir de
  nuevo" (suma al carrito) y eliminar uno o todos, con confirmación dentro
  del modal. La hoja vacía ofrece repetir el más reciente. Se guardan ids y
  elección, nunca precios: al restaurar se recalculan y se descarta lo que
  ya no está en la carta.
