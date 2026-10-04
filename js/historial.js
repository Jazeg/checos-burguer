/* ============================================================
   "Mis pedidos": historial de pedidos enviados desde este
   dispositivo, en un modal. Cada uno se puede pedir de nuevo (se
   suma al carrito) o eliminar, con confirmación dentro del modal.
   El acceso vive en la barra de categorías y solo aparece si hay
   pedidos. Depende de memoria.js y hoja.js.
   ============================================================ */

let confirmandoBorrado = null; /* id del pedido, "todo" o null */

const relojEnvio = new Intl.DateTimeFormat("es-PE", { timeZone: ZONA_NEGOCIO, hour: "numeric", minute: "2-digit", hour12: true });
const diaEnvio = new Intl.DateTimeFormat("es-PE", { timeZone: ZONA_NEGOCIO, weekday: "short", day: "numeric", month: "short" });
const horaEnvio = ms => relojEnvio.format(ms).replace(/\s*([ap])\.?\s*m\.?/i, (_, x) => ` ${x.toLowerCase()}. m.`);
function fechaEnvio(ms) {
  const dias = Math.round((hoyNegocioMs() - hoyNegocioMs(new Date(ms))) / 864e5);
  const dia = dias === 0 ? "Hoy" : dias === 1 ? "Ayer" : diaEnvio.format(ms).replace(/\./g, "");
  return `${dia} · ${horaEnvio(ms)}`;
}
function hoyNegocioMs(fecha = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: ZONA_NEGOCIO, year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(fecha).map(x => [x.type, x.value]));
  return Date.UTC(+p.year, p.month - 1, +p.day);
}

function tarjetaPedidoGuardado(g) {
  const lineas = lineasValidas(g.lineas).map(l => nuevaLinea(l.id, l, l.cant));
  const fuera = g.lineas.length - lineas.length;
  const hoy = lineas.reduce((t, l) => t + precioLinea(l) * l.cant, 0);
  const total = typeof g.total === "number" ? g.total : hoy;
  const confirmando = confirmandoBorrado === g.id;
  return `<article class="pedido-guardado">
    <header><p>${fechaEnvio(g.enviado)}</p><strong>${soles(total)}</strong></header>
    <ul>${lineas.map(l => {
      const extra = detalleLinea(l);
      return `<li><span>${l.cant} × ${PLATOS[l.id].nombre}</span>${extra ? `<small>${extra}</small>` : ""}</li>`;
    }).join("")}</ul>
    ${fuera ? `<p class="pedido-aviso-carta">${fuera === 1 ? "1 producto ya no está" : fuera + " productos ya no están"} en la carta.</p>` : ""}
    <p class="pedido-meta">${[g.modo, g.entrega?.texto ? "Para " + g.entrega.texto : "", g.entrega?.evento, Math.abs(hoy - total) > 0.001 && lineas.length ? "Hoy costaría " + soles(hoy) : ""].filter(Boolean).join(" · ")}</p>
    ${confirmando ? `<div class="pedido-confirmar" role="alertdialog" aria-label="Eliminar pedido">
        <p>¿Eliminar este pedido de tu historial?</p>
        <div><button type="button" data-borrar-confirmado="${g.id}" class="pedido-borrar">Sí, eliminar</button>
          <button type="button" data-borrar-cancelar class="pedido-cancelar">Cancelar</button></div>
      </div>` : `<div class="pedido-acciones">
        ${lineas.length ? `<button type="button" data-repetir-guardado="${g.id}" class="${CLASE_AGREGAR}">Pedir de nuevo</button>` : ""}
        <button type="button" data-borrar-guardado="${g.id}" class="pedido-eliminar" aria-label="Eliminar el pedido de ${fechaEnvio(g.enviado)}">Eliminar</button>
      </div>`}
  </article>`;
}

function pintarMisPedidos() {
  const pedidos = pedidosGuardados();
  $("pedidos-lista").innerHTML = pedidos.length
    ? pedidos.map(tarjetaPedidoGuardado).join("") + (confirmandoBorrado === "todo"
      ? `<div class="pedido-confirmar pedidos-borrar-todo" role="alertdialog" aria-label="Borrar historial">
          <p>¿Borrar todo tu historial de pedidos? No se puede deshacer.</p>
          <div><button type="button" data-borrar-confirmado="todo" class="pedido-borrar">Sí, borrar todo</button>
            <button type="button" data-borrar-cancelar class="pedido-cancelar">Cancelar</button></div>
        </div>`
      : `<button type="button" data-borrar-guardado="todo" class="pedidos-borrar-todo pedido-eliminar">Borrar todo el historial</button>`)
    : `<p class="pedidos-vacio">Aún no tienes pedidos enviados desde este dispositivo. Cuando envíes uno por WhatsApp, aparecerá aquí.</p>`;
  pintarAccesoPedidos();
}

function pintarAccesoPedidos() {
  const n = pedidosGuardados().length;
  $("abrir-mis-pedidos").hidden = n === 0;
  $("mis-pedidos-cantidad").textContent = n;
}

function abrirMisPedidos() {
  confirmandoBorrado = null;
  pintarMisPedidos();
  $("pedidos-dialog").showModal();
  document.body.style.overflow = "hidden";
}

/* tras repintar, el foco vuelve a algo útil de la misma zona */
function enfocarEnLista(selector) { ($("pedidos-lista").querySelector(selector) || $("pedidos-cerrar")).focus(); }

function pedirBorrado(id) { confirmandoBorrado = id; pintarMisPedidos(); enfocarEnLista("[data-borrar-cancelar]"); }
function cancelarBorrado() { confirmandoBorrado = null; pintarMisPedidos(); enfocarEnLista("[data-repetir-guardado], [data-borrar-guardado]"); }
function confirmarBorrado(id) {
  if (id === "todo") borrarPedidosGuardados(); else eliminarPedidoGuardado(id);
  confirmandoBorrado = null;
  pintarMisPedidos();
  enfocarEnLista("[data-repetir-guardado], [data-borrar-guardado]");
  avisar(id === "todo" ? "Borramos tu historial de pedidos." : "Eliminamos el pedido de tu historial.");
}

function repetirGuardado(id) {
  const g = pedidoGuardado(id);
  if (!g) return;
  const n = sumarLineas(g.lineas);
  $("pedidos-dialog").close();
  pintarPedido();
  abrirHoja(true);
  avisar(n ? "Sumamos ese pedido a tu carrito. Revísalo antes de enviarlo." : "Ese pedido ya no tiene productos en la carta.");
}
