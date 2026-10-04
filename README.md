# Checo’s Burger · demo de carta por horario

Sitio estático, sin instalación ni build obligatorio. Para verlo:

```sh
python3 -m http.server 8093 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8093.

Publicado con GitHub Pages desde la raíz de `main`, sin build: lo que está en el repo es lo que se sirve. Por eso `css/tailwind.css` se versiona. Si se regenera, hay que hacer commit del resultado.

## Horarios diarios

La zona del restaurante es `America/Lima`, independientemente de la zona del visitante.

- Desayunos (solo catálogo corporativo): 07:00 inclusive a 11:00 exclusive.
- Hamburguesas: 17:00 inclusive a 01:40 exclusive del día siguiente (delivery). Recojo en tienda hasta 01:00; después solo delivery.
- Cerrado (solo carta pública): de 01:40 a 17:00. Se muestra la próxima carta, su apertura y productos para consultar sin permitir pedidos.
- El catálogo corporativo acepta pedidos a cualquier hora. Por defecto el pedido es para hoy. La opción «¿Es para una fecha específica o un evento?», encima del total, permite elegir fecha, hora y detalle del evento; se abre sola si hoy ya terminó el turno de lo pedido. Lo programado o fuera de horario sale como pedido anticipado. El corte de recojo no se le aplica.

Configurar intervalos en `js/horarios.js` (`TURNOS`, minutos desde medianoche). Los textos de horario se generan desde esa configuración. Catálogo, precios y datos comerciales: `js/data.js`. La migración de 110 productos, la procedencia y los datos pendientes están documentados en `MIGRACION.md`. WhatsApp temporal autorizado: 947 788 574. El desayuno ejecutivo (`js/desayunos.js`) tiene productos y precios del cliente; su horario sigue siendo provisional.

La portada, categorías y recomendaciones siguen la carta seleccionada. El selector permite explorar el otro menú; «Volver al horario actual» restablece la selección automática. Cada cambio de servicio devuelve la vista al horario actual. La página comprueba el reloj cada segundo y al volver a la pestaña. Se vuelve a validar al agregar y al enviar.

El carrito se guarda en el dispositivo (localStorage) y se recupera si se recarga o cierra la página; al enviar por WhatsApp se limpia y el pedido pasa a «Mis pedidos» (modal en la barra de categorías: pedir de nuevo o eliminar). El carrito se conserva durante un cambio de turno. Los artículos no disponibles se señalan y deben retirarse para habilitar WhatsApp. Nunca se envía automáticamente el pedido. La disponibilidad usa el reloj del dispositivo convertido a la zona del negocio; para una tienda con confirmación de pedidos en servidor, esa validación debe repetirse allí con un reloj confiable.

## Verificación

```sh
node --test tests/horarios.test.cjs
```

Cubre apertura/cierre exactos, medianoche, zona horaria, próxima apertura, disponibilidad independiente de la vista, recomendaciones y recursos del catálogo.

## Interfaz

Identidad visual en rojo, verde, amarillo y negro, con el logo original facilitado, fotografías enmarcadas, categorías laterales en escritorio y barra horizontal en móvil. Las tarjetas permiten agregar directamente o abrir una ficha con foto, descripción, precio y disponibilidad. La ficha usa un diálogo nativo; el carrito administra el foco del teclado y bloquea la interacción con el fondo mientras está abierto.

Paleta y fuentes utilitarias: `tailwind.config.js`. Composición y estilos de componentes: `css/styles.css`. Para regenerar las utilidades tras cambiar clases:

```sh
npx tailwindcss@3 -c tailwind.config.js -i css/tailwind-input.css -o css/tailwind.css --minify
```

Verificación visual y funcional realizada en Chromium a 320, 390, 768, 1024 y 1440 px: ficha, carrito, enlace de WhatsApp, cierre con Escape, horarios y navegación sin desbordamiento horizontal.

## Catálogos por público

- `/`: carta pública de hamburguesas/cena, incluso por la mañana. No carga `js/desayunos.js` ni muestra horarios o productos de desayuno.
- `/catalogo-corporativo/`: desayunos y hamburguesas para equipos de municipalidades y entidades públicas. Incluye `noindex, nofollow` y no se enlaza desde la portada pública.
- Almuerzos retirados del catálogo, selector y lógica de pedidos.

Se mantiene la cena completa, con sus acompañamientos y bebidas. El desayuno ejecutivo se edita en `js/desayunos.js`. El logo original está en `assets/marca/checos-burger.png`.

Esta separación es por enlace, NO autenticación: cualquiera que reciba la URL corporativa puede abrirla; sus recursos siguen siendo públicos. Para restringir por persona o entidad se necesita un servidor/proveedor de identidad que autorice también la entrega de datos y los pedidos. No usar una contraseña incrustada en JavaScript como protección.

El QR corporativo deberá apuntar a la URL definitiva terminada en `/catalogo-corporativo/` (incluyendo el subdirectorio del proyecto si se publica en GitHub Pages). Generarlo cuando se confirme el dominio evita imprimir un enlace provisional. No se ha publicado ni generado un QR de producción en este cambio.

Las dos entradas HTML comparten CSS y JavaScript. Al modificar el marcado común, actualizar ambas. La entrada corporativa usa `base href="../"` para funcionar también en GitHub Pages; sus anclas conservan la ruta corporativa.
