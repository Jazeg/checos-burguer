# Checo’s Burger · demo de carta por horario

Sitio estático, sin instalación ni build obligatorio. Para verlo:

```sh
python3 -m http.server 8093 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8093.

Publicado con GitHub Pages desde la raíz de `main`, sin build: lo que está en el repo es lo que se sirve. Por eso `css/tailwind.css` se versiona. Si se regenera, hay que hacer commit del resultado.

## Horarios diarios

La zona del restaurante es `America/Lima`, independientemente de la zona del visitante.

- Desayunos: 07:00 inclusive a 11:00 exclusive.
- Almuerzos: 11:00 inclusive a 15:00 exclusive.
- Hamburguesas: 17:00 inclusive a 00:40 exclusive del día siguiente.
- Cerrado: 00:40–07:00 y 15:00–17:00. Se muestra la próxima carta, su apertura y productos para consultar sin permitir pedidos.

Configurar intervalos en `js/horarios.js` (`TURNOS`, minutos desde medianoche). Los textos de horario se generan desde esa configuración. Catálogo, precios y datos comerciales: `js/data.js`. La migración de 110 productos, la procedencia y los datos pendientes están documentados en `MIGRACION.md`. WhatsApp temporal autorizado: 947 788 574. Los desayunos, los almuerzos y sus ilustraciones son de ejemplo, pendientes de sustituir por datos aprobados.

La portada, categorías y recomendaciones siguen la carta seleccionada. El selector permite explorar el otro menú; «Volver al horario actual» restablece la selección automática. Cada cambio de servicio devuelve la vista al horario actual. La página comprueba el reloj cada segundo y al volver a la pestaña. Se vuelve a validar al agregar y al enviar.

El carrito se conserva durante un cambio de turno. Los artículos no disponibles se señalan y deben retirarse para habilitar WhatsApp. Nunca se envía automáticamente el pedido. La disponibilidad usa el reloj del dispositivo convertido a la zona del negocio; para una tienda con confirmación de pedidos en servidor, esa validación debe repetirse allí con un reloj confiable.

## Verificación

```sh
node --test tests/horarios.test.cjs
```

Cubre apertura/cierre exactos, medianoche, zona horaria, próxima apertura, disponibilidad independiente de la vista, recomendaciones y recursos del catálogo.

## Interfaz

Identidad visual en crema y rojo, con sello tipográfico propio, fotografías enmarcadas, categorías laterales en escritorio y barra horizontal en móvil. Las tarjetas permiten agregar directamente o abrir una ficha con foto, descripción, precio y disponibilidad. La ficha usa un diálogo nativo; el carrito administra el foco del teclado y bloquea la interacción con el fondo mientras está abierto.

Paleta y fuentes utilitarias: `tailwind.config.js`. Composición y estilos de componentes: `css/styles.css`. Para regenerar las utilidades tras cambiar clases:

```sh
npx tailwindcss@3 -c tailwind.config.js -i css/tailwind-input.css -o css/tailwind.css --minify
```

Verificación visual y funcional realizada en Chromium a 320, 390, 768, 1024 y 1440 px: ficha, carrito, enlace de WhatsApp, cierre con Escape, horarios y navegación sin desbordamiento horizontal.
