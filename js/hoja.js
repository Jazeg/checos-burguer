/* ============================================================
   Hoja de pedido: renglones, datos de entrega, contacto guardado
   y apertura/cierre de la hoja. Depende de carrito.js y carta.js.
   ============================================================ */

/* ---------- validación del detalle de entrega ---------- */
let detalleTocado = false;

/* el campo cambia de significado según el modo: en delivery pide dónde
   llevarlo, en recojo a nombre de quién. Label visible y placeholder van
   siempre juntos — el placeholder solo, sin label, dejaba el campo sin
   explicación una vez escrito. */
const TEXTOS_DETALLE = {
  "Delivery": { label: "Dirección o referencia", ph: "Ej.: Jr. Comercio 123, puerta verde", autocomplete: "street-address" },
  "Recojo en tienda": { label: "¿A nombre de quién?", ph: "Ej.: Rosa Quispe", autocomplete: "name" }
};

function pintarCampoDetalle() {
  const t = TEXTOS_DETALLE[modoEntrega] || TEXTOS_DETALLE.Delivery;
  $("detalle-label").textContent = t.label;
  $("detalle").placeholder = t.ph;
  $("detalle").autocomplete = t.autocomplete;
}

function detalleValido() {
  return $("detalle").value.trim().length > 0;
}

function mensajeValidacionDetalle() {
  return modoEntrega === "Delivery"
    ? "Indícanos a dónde llevamos tu pedido."
    : "Dinos a nombre de quién lo dejamos.";
}

function pintarValidacionDetalle() {
  const mostrarError = detalleTocado && !detalleValido();
  const input = $("detalle");
  input.classList.toggle("border-ember", mostrarError);
  input.classList.toggle("border-ink", !mostrarError);
  input.setAttribute("aria-invalid", mostrarError ? "true" : "false");
  $("detalle-error").textContent = mostrarError ? mensajeValidacionDetalle() : "";
  $("detalle-hint").classList.toggle("hidden", mostrarError);
}

/* ---------- hoja de pedido ---------- */
/* la cantidad escrita a mano repinta todo en cada tecla: se recuerda qué
   campo tenía el foco y dónde iba el cursor para devolvérselos */
function focoCantidad() {
  const el = document.activeElement;
  return el?.dataset?.cantidad != null ? { clave: el.dataset.cantidad, zona: el.dataset.zona, pos: el.selectionStart } : null;
}
function devolverFoco(foco) {
  if (!foco) return;
  const el = [...document.querySelectorAll("[data-cantidad]")].find(e => e.dataset.cantidad === foco.clave && e.dataset.zona === foco.zona);
  if (!el) return;
  el.focus();
  el.setSelectionRange(foco.pos, foco.pos);
}

function pintarPedido() {
  const foco = focoCantidad();
  const n = unidadesPedido(), t = totalPedido();
  $("header-cantidad").textContent = n;

  $("pestana-contador").textContent = n;
  $("pestana-contador").classList.toggle("hidden", n === 0);
  $("barra").dataset.visible = n ? "si" : "no";
  actualizarPestana();
  $("barra-items").textContent = n === 1 ? "1 producto" : n + " productos";
  $("barra-total").textContent = soles(t);
  $("hoja-total").textContent = soles(t);

  $("renglones").innerHTML = pedido.size
    ? [...pedido].map(([clave, l]) => {
        const p = PLATOS[l.id], extra = detalleLinea(l), disponible = disponibleAhora(l.id);
        return `
        <div class="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-dashed border-hairline-strong py-3">
          <div class="min-w-0 flex-1 basis-40">
            <div class="font-bold text-sm text-ink">${p.nombre}</div>
            ${extra ? `<div class="linea-detalle">${extra}</div>` : ""}
            <div class="font-mono text-xs text-muted">${soles(precioLinea(l))} c/u${!disponible ? " · Fuera de horario" : SIN_HORARIO && !enHorario(l.id) ? " · Anticipado" : ""}</div>
          </div>
          <div class="ml-auto">${CANTIDAD_MANUAL ? campoCantidad(clave, l.cant, p.nombre, "hoja")
            : stepper(p.nombre, `data-linea-menos="${attr(clave)}"`, `data-linea-mas="${attr(clave)}" ${disponible ? "" : "disabled"}`, l.cant, false)}</div>
          <button type="button" data-eliminar="${attr(clave)}" aria-label="Quitar ${attr(p.nombre)} del pedido"
            class="grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-ember/10 hover:text-ember">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>`;
      }).join("")
    : `<p class="py-6 text-center text-sm text-muted">Tu pedido está vacío. Agrega algo de la carta.</p>${bloqueRepetir()}`;

  pintarDetalleProducto();
  const detalle = $("detalle").value.trim();
  const fecha = SIN_HORARIO ? (pintarEntrega(), datosEntrega()) : null;
  $("vista-comanda").textContent = textoComanda(detalle, fecha);

  const enviar = $("enviar");
  const disponibles = pedidoDisponible();
  $("pedido-aviso").textContent = pedido.size && !disponibles
    ? 'Hay productos fuera de horario. Retíralos con × para enviar tu pedido. Conservamos tu selección.' : '';
  enviar.setAttribute("aria-disabled", disponibles ? "false" : "true");
  enviar.href = disponibles ? enlaceWhatsApp(detalle, fecha) : "#";
  pintarValidacionDetalle();

  document.querySelectorAll("[data-control]").forEach(cont => {
    cont.innerHTML = controlAgregar(cont.dataset.control, cont.dataset.zona);
  });
  devolverFoco(foco);
  guardarBorrador();
}

/* ---------- aviso breve tras agregar desde la ficha ---------- */
let temporizadorAviso;
function avisar(texto) {
  const aviso = $("aviso-agregado");
  aviso.textContent = texto;
  aviso.dataset.visible = "si";
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => { aviso.dataset.visible = "no"; }, 2600);
}

/* ---------- modo de entrega y recojo en tienda ---------- */
function elegirModo(modo) {
  modoEntrega = modo;
  document.querySelectorAll("[data-modo]").forEach(o => {
    const activo = o.dataset.modo === modo;
    o.setAttribute("aria-pressed", activo);
    o.classList.toggle("bg-ink", activo);
    o.classList.toggle("text-canvas", activo);
  });
  pintarCampoDetalle();
  pintarTarifas();
  pintarPedido();
}

/* pasada la hora de delivery del turno solo queda recojo en tienda; en
   los minutos previos, cuenta regresiva en la hoja y bajo el selector de
   turno. Corre cada segundo desde actualizarTurno, por eso solo toca el
   DOM si cambió el minuto. */
let deliveryPintado = null;
function pintarDelivery(forzar = false) {
  const quedan = minutosDelivery();
  if (!forzar && quedan === deliveryPintado) return;
  deliveryPintado = quedan;
  const t = TURNOS[estadoHorario().activo];
  const abierto = quedan !== 0, cuenta = abierto && quedan != null && quedan <= t.avisoDelivery;
  document.querySelector('[data-modo="Delivery"]').disabled = !abierto;
  const texto = !abierto
    ? `El delivery es ${hastaTexto(t.deliveryHasta)}; seguimos atendiendo en el local ${hastaTexto(t.fin)}. Puedes recogerlo en tienda.`
    : cuenta ? `${quedan === 1 ? "Queda 1 minuto" : `Quedan ${quedan} minutos`} para pedir delivery. Después de las ${horaTexto(t.deliveryHasta)}, solo recojo en tienda.` : "";
  $("entrega-aviso").textContent = texto;
  $("aviso-delivery").textContent = texto;
  if (!abierto && modoEntrega === "Delivery") elegirModo("Recojo en tienda");
}

/* tarifas de referencia: el costo final lo confirma el vendedor por
   WhatsApp, así que no se suman al total */
function pintarTarifas() {
  const { zonas, nota } = NEGOCIO.delivery;
  $("delivery-tarifas").hidden = modoEntrega !== "Delivery";
  $("delivery-tarifas").innerHTML = zonas.map(z => `<span>${z.nombre}: <strong>${z.precio}</strong></span>`).join("") + `<small>${nota}</small>`;
}

/* ---------- recordar dirección/nombre para la próxima vez ---------- */
function restaurarContacto() {
  let guardado;
  try { guardado = JSON.parse(localStorage.getItem("checos_contacto_v1")); } catch { guardado = null; }
  if (!guardado) return;

  $("detalle").value = guardado.detalle || "";
  elegirModo(guardado.modo === "Recojo en tienda" || !deliveryDisponible() ? "Recojo en tienda" : "Delivery");
  $("detalle-hint").textContent = "Usamos los datos de tu último pedido — puedes cambiarlos.";
}

function guardarContacto(detalle) {
  try { localStorage.setItem("checos_contacto_v1", JSON.stringify({ modo: modoEntrega, detalle })); } catch { /* El pedido funciona sin almacenamiento. */ }
}

/* ---------- interacciones ---------- */
/* la pestaña se esconde si la hoja está abierta (se solaparían) o si el
   pedido está vacío (no hay nada que abrir y en móvil se monta encima de
   los controles de las tarjetas) */
function actualizarPestana() {
  const estorba = $("hoja").dataset.abierto === "si" || unidadesPedido() === 0;
  $("pestana-pedido").dataset.oculta = estorba ? "si" : "no";
  $("pestana-pedido").tabIndex = estorba ? -1 : 0;
  $("barra").inert = estorba;
}

let focoAntesPedido;
function abrirHoja(v) {
  if (v) focoAntesPedido = document.activeElement;
  $("hoja").inert = !v;
  $("site-shell").inert = v;
  $("hoja").dataset.abierto = v ? "si" : "no";
  $("velo").dataset.abierto = v ? "si" : "no";
  actualizarPestana();
  $("barra").dataset.oculta = v ? "si" : "no";
  document.body.style.overflow = v ? "hidden" : "";
  if (v) $("cerrar-hoja").focus();
  else if (focoAntesPedido?.isConnected && !focoAntesPedido.closest('dialog')) focoAntesPedido.focus();
  else $("header-pedido").focus();
}
