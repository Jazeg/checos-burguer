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
  const cant = pedido.get(id) || 0;
  const nombre = PLATOS[id]?.nombre || "";
  if (!cant) {
    return `<button type="button" data-agregar="${id}"
      class="agregar rounded-full border-2 border-ink bg-mustard px-4 py-1.5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-canvas">
      Agregar
    </button>`;
  }
  return `<div class="flex items-center overflow-hidden rounded-full border-2 border-ink bg-ink text-canvas">
    <button type="button" data-menos="${id}" aria-label="Quitar uno de ${nombre}" class="h-8 w-8 text-lg hover:bg-white/10">−</button>
    <span class="min-w-[22px] text-center font-mono text-sm">${cant}</span>
    <button type="button" data-mas="${id}" aria-label="Agregar uno de ${nombre}" class="h-8 w-8 text-lg hover:bg-white/10">+</button>
  </div>`;
}

/* ---------- cabecera / hero ---------- */
function pintarCabecera() {
  $("marca-nombre").textContent = NEGOCIO.nombre;
  $("marca-bajada").textContent = NEGOCIO.bajada;
  $("estado-horario").textContent = "Abierto ahora · " + NEGOCIO.horario.split("·")[1].trim();
  $("hero-imagen").src = HERO.imagen;
  $("hero-imagen").alt = HERO.alt;
  $("dato-delivery").textContent = "Delivery " + NEGOCIO.delivery.tiempo;
  $("dato-horario").textContent = NEGOCIO.horario;
}

function pintarPie() {
  $("footer-nombre").textContent = NEGOCIO.nombre;
  $("footer-direccion").textContent = NEGOCIO.direccion + ".";
  $("footer-telefono").textContent = "Pedidos al " + NEGOCIO.telefonoVisible + ".";
  $("footer-horario").textContent = NEGOCIO.horario.replace(" · ", " — ");
  $("footer-delivery-centro").textContent = NEGOCIO.delivery.centro;
  $("footer-delivery-otras").textContent = NEGOCIO.delivery.otras;
}

/* ---------- navegación de secciones ---------- */
function pintarPistas() {
  $("pistas").innerHTML = CARTA.map((s, i) => `
    <button type="button" data-ir="${s.id}"
      class="pista shrink-0 rounded-full border-2 border-ink px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors
             ${i === 0 ? "bg-ink text-canvas" : "bg-transparent text-ink hover:bg-hairline"}"
      aria-current="${i === 0}">${s.nombre}</button>
  `).join("");
}

/* ---------- tarjeta de plato ---------- */
function tarjetaPlato(p) {
  const etiquetas = p.etiquetas
    ? `<div class="mb-2 flex flex-wrap gap-1.5">${p.etiquetas.map(t => `
        <span class="rounded-full border-[1.5px] ${claseEtiqueta(t)} px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">${t}</span>
      `).join("")}</div>`
    : "";

  return `
    <article class="plato group flex flex-col overflow-hidden rounded-2xl border-2 border-ink bg-surface transition-transform duration-150 hover:-translate-y-1">
      <div class="aspect-[4/3] overflow-hidden border-b-2 border-ink bg-hairline">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy"
             class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105">
      </div>
      <div class="flex flex-1 flex-col p-4">
        ${etiquetas}
        <h3 class="font-display text-2xl font-extrabold uppercase leading-none text-ink">${p.nombre}</h3>
        <p class="mt-1.5 flex-1 text-sm leading-snug text-muted">${p.desc}</p>
        <div class="mt-3 flex items-center gap-3">
          <span class="font-mono text-lg font-medium text-ember">${soles(p.precio)}</span>
          <div class="ml-auto" data-control="${p.id}">${controlAgregar(p.id)}</div>
        </div>
      </div>
    </article>`;
}

/* ---------- secciones de la carta ---------- */
function pintarCarta() {
  $("carta").innerHTML = CARTA.map(s => `
    <section id="${s.id}" class="scroll-mt-32 px-5 pt-10 sm:px-6">
      <div class="mx-auto max-w-6xl">
        <div class="flex items-baseline gap-3">
          <h2 class="font-display text-4xl font-extrabold uppercase leading-none text-ink sm:text-5xl">${s.nombre}</h2>
          <span class="font-mono text-xs text-muted">${s.platos.length} opciones</span>
        </div>
        <div class="mt-3 mb-6 h-0.5 bg-ink"></div>
        ${s.nota ? `<p class="-mt-4 mb-6 max-w-md text-sm text-muted">${s.nota}</p>` : ""}
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          ${s.platos.map(tarjetaPlato).join("")}
        </div>
      </div>
    </section>
  `).join("");
}

/* ---------- validación del detalle de entrega ---------- */
let detalleTocado = false;

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

  $("pestana-contador").textContent = n;
  $("pestana-contador").classList.toggle("hidden", n === 0);
  $("barra").dataset.visible = n ? "si" : "no";
  $("barra-items").textContent = n === 1 ? "1 producto" : n + " productos";
  $("barra-total").textContent = soles(t);
  $("hoja-total").textContent = soles(t);

  $("renglones").innerHTML = pedido.size
    ? [...pedido].map(([id, cant]) => {
        const p = PLATOS[id];
        return `
        <div class="flex items-center gap-3 border-b border-dashed border-hairline-strong py-3">
          <div class="min-w-0">
            <div class="truncate font-bold text-sm text-ink">${p.nombre}</div>
            <div class="font-mono text-xs text-muted">${soles(p.precio)} c/u</div>
          </div>
          <div class="ml-auto flex items-center overflow-hidden rounded-full border-2 border-ink">
            <button type="button" data-menos="${id}" aria-label="Quitar uno de ${p.nombre}" class="h-8 w-8 text-lg hover:bg-hairline">−</button>
            <span class="min-w-[26px] text-center font-mono text-sm">${cant}</span>
            <button type="button" data-mas="${id}" aria-label="Agregar uno de ${p.nombre}" class="h-8 w-8 text-lg hover:bg-hairline">+</button>
          </div>
          <button type="button" data-eliminar="${id}" aria-label="Quitar ${p.nombre} del pedido"
            class="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-ember/10 hover:text-ember">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>`;
      }).join("")
    : `<p class="py-6 text-center text-sm text-muted">Tu pedido está vacío. Agrega algo de la carta.</p>`;

  const detalle = $("detalle").value.trim();
  $("vista-comanda").textContent = textoComanda(detalle);

  const enviar = $("enviar");
  enviar.setAttribute("aria-disabled", pedido.size ? "false" : "true");
  enviar.href = pedido.size ? enlaceWhatsApp(detalle) : "#";
  pintarValidacionDetalle();

  document.querySelectorAll("[data-control]").forEach(cont => {
    cont.innerHTML = controlAgregar(cont.dataset.control);
  });
}

/* ---------- "¿no sabes qué pedir?" ---------- */
const estadoRecom = { paso: "inicio", modo: null, personas: null, saciedad: null, picante: null, plato: null, platos: null };

const CHIP = "rounded-full border-2 border-ink px-4 py-2 font-bold text-ink transition-colors hover:bg-mustard active:scale-95";
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
    <button type="button" data-recom-reset class="mt-4 font-mono text-xs uppercase tracking-wider text-muted underline hover:text-ink">Cancelar</button>`);
}

/* tarjeta compacta para el carril de opciones del quiz por gustos */
function tarjetaRecomendada(p, i) {
  return `
    <article class="recom-entrada w-56 shrink-0 snap-start overflow-hidden rounded-2xl border-2 border-ink bg-canvas" style="animation-delay:${i * 90}ms">
      <img src="${p.imagen}" alt="${p.nombre}" class="h-32 w-full border-b-2 border-ink object-cover">
      <div class="p-3.5">
        <h4 class="font-display text-xl font-extrabold uppercase leading-none text-ink">${p.nombre}</h4>
        <p class="mt-1 line-clamp-2 text-xs leading-snug text-muted">${p.desc}</p>
        <div class="mt-2.5 flex items-center gap-2">
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
      <p class="mt-3 font-mono text-[11px] text-muted">Guardamos tus gustos y tu dirección solo en este teléfono. Nada se envía a un servidor.</p>`);
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
      cuerpo.innerHTML = envolverRecom(`<p class="text-sm text-muted">Por ahora no queda nada nuevo por recomendarte. <button type="button" data-recom-reset class="underline">Volver a intentar</button></p>`);
      return;
    }
    cuerpo.innerHTML = envolverRecom(`
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img src="${plato.imagen}" alt="${plato.nombre}" class="h-28 w-full shrink-0 rounded-xl border-2 border-ink object-cover sm:h-32 sm:w-32">
        <div class="min-w-0 flex-1">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-ember">La casa recomienda</p>
          <h3 class="font-display text-2xl font-extrabold uppercase leading-none text-ink">${plato.nombre}</h3>
          <p class="mt-1 text-sm text-muted">${plato.desc}</p>
          <div class="mt-3 flex flex-wrap items-center gap-3">
            <span class="font-mono text-lg font-medium text-ember">${soles(plato.precio)}</span>
            <div data-control="${plato.id}">${controlAgregar(plato.id)}</div>
            <button type="button" data-recom-otra class="font-mono text-xs uppercase tracking-wider text-muted underline hover:text-ink">Prefiero otra</button>
            <button type="button" data-recom-reset class="font-mono text-xs uppercase tracking-wider text-muted underline hover:text-ink">Empezar de nuevo</button>
          </div>
        </div>
      </div>`);
    return;
  }

  if (estadoRecom.paso === "resultado" && estadoRecom.modo === "gustos") {
    const platos = estadoRecom.platos || [];
    if (!platos.length) {
      cuerpo.innerHTML = envolverRecom(`<p class="text-sm text-muted">Por ahora no queda nada nuevo con ese filtro. <button type="button" data-recom-reset class="underline">Volver a intentar</button></p>`);
      return;
    }
    cuerpo.innerHTML = envolverRecom(`
      <p class="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ember">Según lo que buscas — agrega las que quieras</p>
      <div class="carril-recom flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
        ${platos.map(tarjetaRecomendada).join("")}
      </div>
      <div class="mt-4 flex flex-wrap gap-4">
        <button type="button" data-recom-otra class="font-mono text-xs uppercase tracking-wider text-muted underline hover:text-ink">Ver otras opciones</button>
        <button type="button" data-recom-reset class="font-mono text-xs uppercase tracking-wider text-muted underline hover:text-ink">Empezar de nuevo</button>
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
  try { guardado = JSON.parse(localStorage.getItem("bc_contacto")); } catch { guardado = null; }
  if (!guardado) return;

  modoEntrega = guardado.modo === "Recojo en tienda" ? "Recojo en tienda" : "Delivery";
  $("detalle").value = guardado.detalle || "";
  $("detalle").placeholder = modoEntrega === "Delivery" ? "Dirección o referencia" : "¿A nombre de quién?";
  $("detalle-hint").textContent = "Usamos los datos de tu último pedido — puedes cambiarlos.";

  document.querySelectorAll("[data-modo]").forEach(o => {
    const activo = o.dataset.modo === modoEntrega;
    o.setAttribute("aria-pressed", activo);
    o.classList.toggle("bg-ink", activo);
    o.classList.toggle("text-canvas", activo);
  });
}

function guardarContacto(detalle) {
  localStorage.setItem("bc_contacto", JSON.stringify({ modo: modoEntrega, detalle }));
}

/* ---------- interacciones ---------- */
function abrirHoja(v) {
  $("hoja").dataset.abierto = v ? "si" : "no";
  $("velo").dataset.abierto = v ? "si" : "no";
  $("pestana-pedido").dataset.oculta = v ? "si" : "no";
  $("barra").dataset.oculta = v ? "si" : "no";
  document.body.style.overflow = v ? "hidden" : "";
  if (v) $("cerrar-hoja").focus();
}

function iniciar() {
  pintarCabecera();
  pintarPie();
  pintarPistas();
  pintarCarta();
  pintarRecomendador();
  restaurarContacto();
  pintarPedido();

  document.addEventListener("click", e => {
    const b = e.target.closest("button, [data-ir]");
    if (!b) return;
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
    if (!pedido.size) return;

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
      $("detalle").placeholder = modoEntrega === "Delivery" ? "Dirección o referencia" : "¿A nombre de quién?";
      pintarPedido();
    });
  });

  $("pestana-pedido").addEventListener("click", () => abrirHoja(true));
  $("pestana-pedido").addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirHoja(true); }
  });
  $("barra-abrir").addEventListener("click", () => abrirHoja(true));
  $("cerrar-hoja").addEventListener("click", () => abrirHoja(false));
  $("velo").addEventListener("click", () => abrirHoja(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape") abrirHoja(false); });

  const pistas = () => [...document.querySelectorAll(".pista")];
  const observador = new IntersectionObserver(entradas => {
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
      pistas().find(p => p.dataset.ir === en.target.id)
        ?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  }, { rootMargin: "-160px 0px -65% 0px" });
  CARTA.forEach(s => observador.observe($(s.id)));
}

document.addEventListener("DOMContentLoaded", iniciar);
