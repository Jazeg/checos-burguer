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
function pintarPedido() {
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
    ? [...pedido].map(([id, cant]) => {
        const p = PLATOS[id];
        return `
        <div class="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-dashed border-hairline-strong py-3">
          <div class="min-w-0 flex-1 basis-40">
            <div class="font-bold text-sm text-ink">${p.nombre}</div>
            <div class="font-mono text-xs text-muted">${soles(p.precio)} c/u${disponibleAhora(id) ? "" : " · Fuera de horario"}</div>
          </div>
          <div class="ml-auto flex items-center overflow-hidden rounded-full border-2 border-ink">
            <button type="button" data-menos="${id}" aria-label="Quitar uno de ${p.nombre}" class="h-11 w-11 text-lg hover:bg-hairline">−</button>
            <span class="min-w-[26px] text-center font-mono text-sm">${cant}</span>
            <button type="button" data-mas="${id}" ${disponibleAhora(id) ? "" : "disabled"} aria-label="Agregar uno de ${p.nombre}" class="h-11 w-11 text-lg hover:bg-hairline">+</button>
          </div>
          <button type="button" data-eliminar="${id}" aria-label="Quitar ${p.nombre} del pedido"
            class="grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-ember/10 hover:text-ember">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>`;
      }).join("")
    : `<p class="py-6 text-center text-sm text-muted">Tu pedido está vacío. Agrega algo de la carta.</p>`;

  pintarDetalleProducto();
  const detalle = $("detalle").value.trim();
  $("vista-comanda").textContent = textoComanda(detalle);

  const enviar = $("enviar");
  const disponibles = pedidoDisponible();
  $("pedido-aviso").textContent = pedido.size && !disponibles
    ? 'Hay productos fuera de horario. Retíralos con × para enviar tu pedido. Conservamos tu selección.' : '';
  enviar.setAttribute("aria-disabled", disponibles ? "false" : "true");
  enviar.href = disponibles ? enlaceWhatsApp(detalle) : "#";
  pintarValidacionDetalle();

  document.querySelectorAll("[data-control]").forEach(cont => {
    cont.innerHTML = controlAgregar(cont.dataset.control);
  });
}

/* ---------- recordar dirección/nombre para la próxima vez ---------- */
function restaurarContacto() {
  let guardado;
  try { guardado = JSON.parse(localStorage.getItem("checos_contacto_v1")); } catch { guardado = null; }
  if (!guardado) return;

  modoEntrega = guardado.modo === "Recojo en tienda" ? "Recojo en tienda" : "Delivery";
  $("detalle").value = guardado.detalle || "";
  pintarCampoDetalle();
  $("detalle-hint").textContent = "Usamos los datos de tu último pedido — puedes cambiarlos.";

  document.querySelectorAll("[data-modo]").forEach(o => {
    const activo = o.dataset.modo === modoEntrega;
    o.setAttribute("aria-pressed", activo);
    o.classList.toggle("bg-ink", activo);
    o.classList.toggle("text-canvas", activo);
  });
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
