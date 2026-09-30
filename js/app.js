/* ============================================================
   Render de la carta y de la hoja de pedido + interacciones.
   Depende de data.js (CARTA, NEGOCIO, HERO) y carrito.js.
   ============================================================ */

const $ = id => document.getElementById(id);
const claseEtiqueta = t =>
  t === "Picante" ? "border-ember text-ember" :
  /pedid|ahorr/i.test(t) ? "bg-mustard border-ink" :
  "border-ink";

/* botón "Agregar" o stepper −/+, según si el plato ya está en el carrito.
   Se usa tanto en las tarjetas de la carta como en el resultado del
   recomendador, así que el carrito los mantiene sincronizados a todos. */
function controlAgregar(id) {
  if (!disponibleAhora(id)) return '<span class="fuera-horario">Fuera de horario</span>';
  const cant = pedido.get(id) || 0;
  const nombre = PLATOS[id]?.nombre || "";
  if (!cant) {
    return `<button type="button" data-agregar="${id}"
      class="agregar inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-mustard px-5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-canvas">
      Agregar
    </button>`;
  }
  return `<div class="flex items-center overflow-hidden rounded-full border-2 border-ink bg-ink text-canvas">
    <button type="button" data-menos="${id}" aria-label="Quitar uno de ${nombre}" class="h-11 w-11 text-lg hover:bg-white/10">−</button>
    <span class="min-w-[22px] text-center font-mono text-sm">${cant}</span>
    <button type="button" data-mas="${id}" aria-label="Agregar uno de ${nombre}" class="h-11 w-11 text-lg hover:bg-white/10">+</button>
  </div>`;
}

/* ---------- cabecera / hero ---------- */
function pintarCabecera() {
  $("marca-nombre").textContent = NEGOCIO.nombre;
  $("marca-bajada").textContent = NEGOCIO.bajada;
  $("estado-horario").textContent = estadoActual.activo ? "Abierto · " + TURNOS[estadoActual.activo].nombre : "Cerrado · abrimos " + horaTexto(TURNOS[estadoActual.siguiente].inicio);
  $("hero-imagen").src = TURNOS[turnoVisible()].imagen;
  $("hero-imagen").alt = TURNOS[turnoVisible()].alt;
  $("dato-delivery").textContent = "Delivery · " + NEGOCIO.delivery.tiempo;
  $("dato-horario").textContent = horarioTurno(turnoVisible());
}

function pintarPie() {
  $("footer-nombre").textContent = NEGOCIO.nombre;
  $("footer-direccion").textContent = NEGOCIO.direccion + ".";
  $("footer-telefono").textContent = "Pedidos al " + NEGOCIO.telefonoVisible + ".";
  $("footer-horario").textContent = "Todos los días · " + Object.values(TURNOS).map(t => `${t.nombre}: ${horaTexto(t.inicio)} – ${horaTexto(t.fin)}${t.provisional ? " (provisional)" : ""}`).join(". ");
  $("footer-delivery-centro").textContent = NEGOCIO.delivery.centro;
  $("footer-delivery-otras").textContent = NEGOCIO.delivery.otras;
}

/* ---------- navegación de secciones ---------- */
function pintarPistas() {
  $("pistas").innerHTML = cartaVisible().map((s, i) => `
    <button type="button" data-ir="${s.id}"
      class="pista inline-flex min-h-11 shrink-0 items-center rounded-full border-2 border-ink px-4 font-mono text-xs uppercase tracking-widest transition-colors
             ${i === 0 ? "bg-ink text-canvas" : "bg-transparent text-ink hover:bg-hairline"}"
      aria-current="${i === 0}">${s.nombre}</button>
  `).join("");
}

/* ---------- tarjeta de plato ---------- */
function tarjetaPlato(p) {
  return `<article class="menu-product">
    <button type="button" class="product-image" data-producto="${p.id}" aria-label="Ver detalle de ${p.nombre}">
      <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" width="480" height="360">
      ${p.imagen.endsWith(".jpg") ? '<span class="reference-caption">Foto referencial</span>' : ''}
      <span class="image-more" aria-hidden="true">↗</span>
    </button>
    <div class="product-labels">${(p.etiquetas || []).map(t => `<span>${t}</span>`).join('')}</div>
    <h3><button type="button" data-producto="${p.id}">${p.nombre}</button></h3>
    <p class="product-description">${p.desc}</p>
    <div class="product-actions"><span class="product-price">${soles(p.precio)}</span><div data-control="${p.id}">${controlAgregar(p.id)}</div></div>
  </article>`;
}

function pintarCarta() {
  const consulta = ($("buscar-carta")?.value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const secciones = cartaVisible().map(s => ({ ...s, platos: s.platos.filter(p =>
    `${p.nombre} ${s.nombre}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(consulta)) })).filter(s => s.platos.length);
  $("busqueda-resultado").textContent = consulta ? `${secciones.reduce((n,s) => n+s.platos.length, 0)} productos encontrados` : '';
  $("carta").innerHTML = secciones.map((s, i) => `
    <section id="${s.id}" class="menu-section">
      <div class="section-heading"><h2>${s.nombre}</h2><span>${String(s.platos.length).padStart(2, '0')} opciones</span></div>
      ${s.nota ? `<p class="section-note">${s.nota}</p>` : ''}
      <div class="product-grid">${s.platos.map((p, n) => tarjetaPlato(p) + (!consulta && i === 0 && n === 1 ? promoCarta() : '')).join('')}</div>
    </section>`).join('') || '<p class="sin-resultados">No encontramos ese producto en esta carta. Prueba otro nombre o cambia de turno.</p>';
  document.querySelectorAll('[data-ir]').forEach(b => { b.hidden = !secciones.some(s => s.id === b.dataset.ir); });
}


function promoCarta() {
  const promo = TURNOS[turnoVisible()].promo;
  return `<aside class="menu-promo"><span>${promo.antes}</span><em>${promo.destacado}</em>
    <p>${promo.texto}</p>
    <a href="#${promo.enlace}">${promo.cta} ↗</a><span class="promo-flower" aria-hidden="true">✳</span></aside>`;
}

let productoActivo = null;
function pintarDetalleProducto() {
  if (!productoActivo) return;
  const p = PLATOS[productoActivo];
  const turnos = Object.keys(TURNOS).filter(id => TURNOS[id].carta.some(s => s.platos.some(item => item.id === p.id)));
  const turno = turnos.includes(turnoVisible()) ? turnoVisible() : turnos[0];
  $("producto-imagen").src = p.imagen; $("producto-imagen").alt = p.nombre;
  $("producto-titulo").textContent = p.nombre;
  $("producto-categoria").textContent = TURNOS[turno].carta.find(s => s.id === p.categoria).nombre;
  $("producto-descripcion").textContent = p.desc || "Consulta los ingredientes y acompañamientos con Checo’s al pedir.";
  $("producto-precio").textContent = soles(p.precio);
  $("producto-horario").textContent = (disponibleAhora(p.id) ? 'Disponible ahora · ' : 'Fuera de horario · ') + turnos.map(id => `${TURNOS[id].nombre}: ${horarioTurno(id)}`).join(' / ');
  $("producto-control").dataset.control = p.id;
  $("producto-control").innerHTML = controlAgregar(p.id);
  $("producto-confirmacion").textContent = pedido.has(p.id) ? `${pedido.get(p.id)} en tu pedido` : '';
}
function abrirProducto(id) {
  productoActivo = id;
  pintarDetalleProducto();
  $("producto-dialog").showModal();
  document.body.style.overflow = 'hidden';
}

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

/* ---------- "¿no sabes qué pedir?" ---------- */
const estadoRecom = { paso: "inicio", modo: null, personas: null, saciedad: null, picante: null, plato: null, platos: null };

const CHIP = "inline-flex min-h-11 items-center rounded-full border-2 border-ink px-4 font-bold text-ink transition-colors hover:bg-mustard active:scale-95";
const ENLACE = "inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-wider text-muted underline hover:text-ink";
const PASO_LABEL = { "casa-personas": "Pregunta 1 de 2", "casa-saciedad": "Pregunta 2 de 2", "gustos-saciedad": "Pregunta 1 de 2", "gustos-picante": "Pregunta 2 de 2" };

/* envuelve cada estado del widget en su propia animación de entrada;
   la key fuerza a reiniciar la animación aunque el contenido cambie poco */
function envolverRecom(html) {
  return `<div class="recom-entrada">${html}</div>`;
}

function pasoPreguntas(paso, titulo, chips, dataAttr) {
  return envolverRecom(`
    <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">${PASO_LABEL[paso]}</p>
    <h3 class="mb-4 font-display text-2xl font-extrabold uppercase text-ink">${titulo}</h3>
    <div class="flex flex-wrap gap-2">
      ${chips.map(([valor, texto]) => `<button type="button" data-${dataAttr}="${valor}" class="${CHIP}">${texto}</button>`).join("")}
    </div>
    <button type="button" data-recom-reset class="mt-2 ${ENLACE}">Cancelar</button>`);
}

/* tarjeta compacta para el carril de opciones del quiz por gustos */
function tarjetaRecomendada(p, i) {
  return `
    <article class="recom-entrada w-[17rem] shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-ink bg-canvas sm:w-56" style="animation-delay:${i * 90}ms">
      <img src="${p.imagen}" alt="${p.nombre}" class="h-32 w-full border-b-2 border-ink object-cover">
      <div class="p-3.5">
        <h4 class="font-display text-xl font-extrabold uppercase leading-none text-ink">${p.nombre}</h4>
        <p class="mt-1 line-clamp-2 text-xs leading-snug text-muted">${p.desc}</p>
        <div class="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-2 pr-14 sm:pr-0">
          <span class="font-mono text-sm font-medium text-ember">${soles(p.precio)}</span>
          <div class="ml-auto" data-control="${p.id}">${controlAgregar(p.id)}</div>
        </div>
      </div>
    </article>`;
}

function pintarRecomendador() {
  const cuerpo = $("recom-cuerpo");

  if (estadoRecom.paso === "inicio") {
    cuerpo.innerHTML = envolverRecom(`
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-ember">¿No sabes qué pedir?</p>
          <h2 class="font-display text-3xl font-extrabold uppercase leading-none text-ink sm:text-4xl">Te ayudamos a elegir</h2>
        </div>
        <div class="flex flex-wrap gap-3 sm:ml-auto">
          <button type="button" data-recom-casa class="boton-solido rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-bold text-canvas">Deja que decida la casa</button>
          <button type="button" data-recom-gustos class="rounded-full border-2 border-ink px-5 py-2.5 font-bold text-ink hover:bg-hairline">Prefiero elegir por gustos</button>
        </div>
      </div>
      <p class="mt-3 font-mono text-xs text-muted">Guardamos tus gustos y tu dirección solo en este teléfono. Nada se envía a un servidor.</p>`);
    return;
  }

  if (estadoRecom.paso === "casa-personas") {
    cuerpo.innerHTML = pasoPreguntas("casa-personas", "¿Para cuántos pedimos?", [
      ["solo", "Solo yo"], ["dos", "Somos 2"], ["grupo", "Grupo"]
    ], "personas");
    return;
  }

  if (estadoRecom.paso === "casa-saciedad" || estadoRecom.paso === "gustos-saciedad") {
    cuerpo.innerHTML = pasoPreguntas(estadoRecom.paso, "¿Cómo quieres comer hoy?", [
      ["liviano", "Ligero"], ["normal", "Normal"], ["lleno", "Bien lleno"]
    ], "saciedad");
    return;
  }

  if (estadoRecom.paso === "gustos-picante") {
    cuerpo.innerHTML = pasoPreguntas("gustos-picante", "¿Le entras al picante?", [
      ["si", "Sí, dale"], ["no", "Mejor no"], ["indiferente", "Me da igual"]
    ], "picante");
    return;
  }

  if (estadoRecom.paso === "resultado" && estadoRecom.modo === "casa") {
    const plato = estadoRecom.plato;
    if (!plato) {
      cuerpo.innerHTML = envolverRecom(`<p class="text-sm text-muted">Por ahora no queda nada nuevo por recomendarte. <button type="button" data-recom-reset class="${ENLACE}">Volver a intentar</button></p>`);
      return;
    }
    cuerpo.innerHTML = envolverRecom(`
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img src="${plato.imagen}" alt="${plato.nombre}" class="h-28 w-full shrink-0 rounded-xl border-2 border-ink object-cover sm:h-32 sm:w-32">
        <div class="min-w-0 flex-1">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-ember">La casa recomienda</p>
          <h3 class="font-display text-2xl font-extrabold uppercase leading-none text-ink">${plato.nombre}</h3>
          <p class="mt-1 text-sm text-muted">${plato.desc}</p>
          <div class="mt-3 flex flex-wrap items-center gap-3 pr-14 sm:pr-0">
            <span class="font-mono text-lg font-medium text-ember">${soles(plato.precio)}</span>
            <div data-control="${plato.id}">${controlAgregar(plato.id)}</div>
            <button type="button" data-recom-otra class="${ENLACE}">Prefiero otra</button>
            <button type="button" data-recom-reset class="${ENLACE}">Empezar de nuevo</button>
          </div>
        </div>
      </div>`);
    return;
  }

  if (estadoRecom.paso === "resultado" && estadoRecom.modo === "gustos") {
    const platos = estadoRecom.platos || [];
    if (!platos.length) {
      cuerpo.innerHTML = envolverRecom(`<p class="text-sm text-muted">Por ahora no queda nada nuevo con ese filtro. <button type="button" data-recom-reset class="${ENLACE}">Volver a intentar</button></p>`);
      return;
    }
    cuerpo.innerHTML = envolverRecom(`
      <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ember">Según lo que buscas — agrega las que quieras</p>
      <div class="carril-recom flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
        ${platos.map(tarjetaRecomendada).join("")}
      </div>
      <div class="mt-4 flex flex-wrap gap-4">
        <button type="button" data-recom-otra class="${ENLACE}">Ver otras opciones</button>
        <button type="button" data-recom-reset class="${ENLACE}">Empezar de nuevo</button>
      </div>`);
    return;
  }
}

function siguienteRecomendacion() {
  if (estadoRecom.modo === "casa") {
    estadoRecom.plato = recomendarCasa(estadoRecom.personas, estadoRecom.saciedad);
  } else {
    estadoRecom.platos = recomendarListaPorGustos(estadoRecom.saciedad, estadoRecom.picante);
  }
  estadoRecom.paso = "resultado";
  pintarRecomendador();
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

function iniciar() {
  actualizarTurno(true);
  pintarPie();
  restaurarContacto();
  pintarPedido();

  document.addEventListener("click", e => {
    const b = e.target.closest("button, [data-ir]");
    if (!b) return;
    if (b.dataset.producto) abrirProducto(b.dataset.producto);
    if (b.dataset.turno) { turnoManual = b.dataset.turno; actualizarTurno(true); }
    if (b.id === 'turno-auto') { turnoManual = null; actualizarTurno(true); }
    if (b.dataset.agregar) sumarAlPedido(b.dataset.agregar, 1);
    if (b.dataset.mas) sumarAlPedido(b.dataset.mas, 1);
    if (b.dataset.menos) sumarAlPedido(b.dataset.menos, -1);
    if (b.dataset.eliminar) eliminarDelPedido(b.dataset.eliminar);
    if (b.dataset.ir) $(b.dataset.ir).scrollIntoView({ behavior: "smooth", block: "start" });

    if ("recomCasa" in b.dataset) { estadoRecom.modo = "casa"; estadoRecom.paso = "casa-personas"; pintarRecomendador(); }
    if ("recomGustos" in b.dataset) { estadoRecom.modo = "gustos"; estadoRecom.paso = "gustos-saciedad"; pintarRecomendador(); }
    if (b.dataset.personas) { estadoRecom.personas = b.dataset.personas; estadoRecom.paso = "casa-saciedad"; pintarRecomendador(); }
    if (b.dataset.saciedad) {
      estadoRecom.saciedad = b.dataset.saciedad;
      if (estadoRecom.modo === "casa") siguienteRecomendacion();
      else { estadoRecom.paso = "gustos-picante"; pintarRecomendador(); }
    }
    if (b.dataset.picante) { estadoRecom.picante = b.dataset.picante; siguienteRecomendacion(); }
    if ("recomOtra" in b.dataset) siguienteRecomendacion();
    if ("recomReset" in b.dataset) {
      estadoRecom.paso = "inicio"; estadoRecom.modo = null;
      estadoRecom.personas = estadoRecom.saciedad = estadoRecom.picante = null;
      estadoRecom.plato = estadoRecom.platos = null;
      pintarRecomendador();
    }
  });

  $("enviar").addEventListener("click", e => {
    actualizarTurno();
    if (!pedidoDisponible()) { e.preventDefault(); return; }

    if (!detalleValido()) {
      e.preventDefault();
      detalleTocado = true;
      pintarValidacionDetalle();
      $("detalle").focus();
      return;
    }

    const detalle = $("detalle").value.trim();
    guardarContacto(detalle);
    registrarPedidoEnHistorial([...pedido.keys()]);
  });

  $("buscar-carta").addEventListener('input', () => { pintarCarta(); observarCarta(); });
  $("detalle").addEventListener("input", pintarPedido);
  $("detalle").addEventListener("blur", () => { detalleTocado = true; pintarValidacionDetalle(); });

  document.querySelectorAll("[data-modo]").forEach(b => {
    b.addEventListener("click", () => {
      modoEntrega = b.dataset.modo;
      document.querySelectorAll("[data-modo]").forEach(o => {
        const activo = o === b;
        o.setAttribute("aria-pressed", activo);
        o.classList.toggle("bg-ink", activo);
        o.classList.toggle("text-canvas", activo);
      });
      pintarCampoDetalle();
      pintarPedido();
    });
  });

  /* el teclado virtual no cambia innerHeight, solo visualViewport: la
     diferencia entre ambos es lo que el teclado tapa. Ver --teclado en
     styles.css. */
  const vv = window.visualViewport;
  if (vv) {
    const medirTeclado = () => {
      const tapado = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty("--teclado", Math.round(tapado) + "px");
    };
    vv.addEventListener("resize", medirTeclado);
    vv.addEventListener("scroll", medirTeclado);
    medirTeclado();
  }

  $("detalle").addEventListener("focus", () => {
    setTimeout(() => $("detalle").scrollIntoView({ block: "center", behavior: "smooth" }), 250);
  });

  $("pestana-pedido").addEventListener("click", () => abrirHoja(true));
  $("pestana-pedido").addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirHoja(true); }
  });
  $("hoja").addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const controls = [...$("hoja").querySelectorAll('button:not([disabled]), input, a[href]:not([aria-disabled="true"])')].filter(el => el.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  $("header-pedido").addEventListener('click', () => abrirHoja(true));
  $("producto-cerrar").addEventListener('click', () => $("producto-dialog").close());
  $("producto-dialog").addEventListener('close', () => { document.body.style.overflow = $("hoja").dataset.abierto === "si" ? "hidden" : ""; productoActivo = null; });
  $("producto-dialog").addEventListener('click', e => { if (e.target === $("producto-dialog")) $("producto-dialog").close(); });
  $("producto-pedido").addEventListener('click', () => { $("producto-dialog").close(); abrirHoja(true); });
  $("barra-abrir").addEventListener("click", () => abrirHoja(true));
  $("cerrar-hoja").addEventListener("click", () => abrirHoja(false));
  $("velo").addEventListener("click", () => abrirHoja(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && $("hoja").dataset.abierto === "si") abrirHoja(false); });

  setInterval(actualizarTurno, 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) actualizarTurno(); });
  window.addEventListener('focus', () => actualizarTurno());
  window.addEventListener('pageshow', () => actualizarTurno());
}

let observadorCarta;
function observarCarta() {
  observadorCarta?.disconnect();
  const pistas = () => [...document.querySelectorAll(".pista")];
  observadorCarta = new IntersectionObserver(entradas => {
    entradas.forEach(en => {
      if (!en.isIntersecting) return;
      pistas().forEach(p => {
        const activa = p.dataset.ir === en.target.id;
        p.setAttribute("aria-current", activa);
        p.classList.toggle("bg-ink", activa);
        p.classList.toggle("bg-transparent", !activa);
        p.classList.toggle("text-canvas", activa);
        p.classList.toggle("text-ink", !activa);
        p.classList.toggle("hover:bg-hairline", !activa);
      });
      const active = pistas().find(p => p.dataset.ir === en.target.id);
      if (active && window.innerWidth < 1000) $("pistas").scrollTo({ left: active.offsetLeft - 20, behavior: 'smooth' });
    });
  }, { rootMargin: "-160px 0px -65% 0px" });
  cartaVisible().forEach(s => { if ($(s.id)) observadorCarta.observe($(s.id)); });
}

function actualizarTurno(forzar = false) {
  const siguiente = estadoHorario();
  const cambio = siguiente.activo !== estadoActual.activo;
  if (!forzar && !cambio) return;
  estadoActual = siguiente;
  if (cambio) {
    turnoManual = null;
    $("aviso-turno").textContent = 'Cambió el horario de atención. Actualizamos la carta y conservamos tu pedido para que lo revises.';
  }
  const id = turnoVisible(), turno = TURNOS[id];
  document.body.dataset.turno = id;
  pintarCabecera();
  $("hero-estado").textContent = !estadoActual.activo
    ? `Cerrado · abrimos a las ${horaTexto(TURNOS[estadoActual.siguiente].inicio)}`
    : estadoActual.activo === id ? `${turno.nombre} · disponible ahora` : 'Explora la carta · fuera de horario';
  $("hero-titulo").innerHTML = turno.titulo;
  $("hero-descripcion").textContent = turno.descripcion;
  $("hero-carta").textContent = `Ver ${turno.nombre.toLowerCase()}`;
  $("hero-carta").href = '#' + turno.carta[0].id;
  $("hero-secundario").textContent = turno.secundario.texto;
  $("hero-secundario").href = '#' + turno.secundario.enlace;
  $("marca-bajada").textContent = 'Desayunos & hamburguesas';
  for (const key of Object.keys(TURNOS)) $("horas-" + key).textContent = horarioTurno(key);
  document.querySelectorAll('[data-turno]').forEach(b => b.setAttribute('aria-pressed', b.dataset.turno === id));
  $("turno-auto").hidden = !turnoManual;
  $("turno-estado").textContent = !estadoActual.activo
    ? `Estamos descansando. Abrimos a las ${horaTexto(TURNOS[estadoActual.siguiente].inicio)}. Puedes explorar la carta.`
    : estadoActual.activo === id ? `Disponible ahora · ${turno.nombre} hasta las ${horaTexto(turno.fin)}.`
    : `Estás explorando ${turno.nombre.toLowerCase()}. Disponible de ${horarioTurno(id)}. Ahora servimos ${TURNOS[estadoActual.activo].nombre.toLowerCase()}.`;
  estadoRecom.paso = 'inicio'; estadoRecom.plato = estadoRecom.platos = null;
  pintarPistas(); pintarCarta(); pintarRecomendador(); pintarPedido(); observarCarta();
}

document.addEventListener("DOMContentLoaded", iniciar);
