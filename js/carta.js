/* ============================================================
   Carta: cabecera, pie, categorías, tarjetas, subgrupos y ficha
   de producto. Depende de data.js, horarios.js y carrito.js.
   ============================================================ */

const $ = id => document.getElementById(id);
const enlaceSeccion = id => (ES_CORPORATIVO ? "catalogo-corporativo/" : "") + "#" + id;
const claseEtiqueta = t =>
  t === "Picante" ? "border-ember text-ember" :
  /pedid|ahorr/i.test(t) ? "bg-mustard border-ink" :
  "border-ink";

const attr = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const precioTexto = p => p.tamanos ? "Desde " + soles(Math.min(...p.tamanos.map(t => t.precio))) : soles(p.precio);
const CLASE_AGREGAR = "agregar inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-mustard px-5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-canvas";

/* catálogo ejecutivo: cantidad escrita a mano. data-zona distingue el
   mismo campo en la carta, la ficha y la hoja para devolverle el foco. */
function campoCantidad(clave, cant, nombre, zona) {
  return `<input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="4" class="cantidad-input"
    data-cantidad="${attr(clave)}" data-zona="${zona}" value="${cant}" aria-label="Cantidad de ${attr(nombre)}">`;
}

function stepper(nombre, menos, mas, cant, oscuro = true) {
  return `<div class="flex items-center overflow-hidden rounded-full border-2 border-ink ${oscuro ? "bg-ink text-canvas" : ""}">
    <button type="button" ${menos} aria-label="Quitar uno de ${attr(nombre)}" class="h-11 w-11 text-lg ${oscuro ? "hover:bg-white/10" : "hover:bg-hairline"}">−</button>
    <span class="min-w-[22px] text-center font-mono text-sm">${cant}</span>
    <button type="button" ${mas} aria-label="Agregar uno de ${attr(nombre)}" class="h-11 w-11 text-lg ${oscuro ? "hover:bg-white/10" : "hover:bg-hairline"}">+</button>
  </div>`;
}

/* botón "Agregar" o control de cantidad, según si el plato ya está en el
   carrito. Se usa tanto en las tarjetas de la carta como en el resultado
   del recomendador, así que el carrito los mantiene sincronizados a todos.
   Los platos con algo que elegir abren la ficha en vez de sumar directo. */
function controlAgregar(id, zona = "carta") {
  if (!disponibleAhora(id)) return '<span class="fuera-horario">Fuera de horario</span>';
  const p = PLATOS[id], nombre = p?.nombre || "";
  if (personalizable(p)) {
    const cant = cantidadPlato(id);
    return `<button type="button" data-producto="${id}" class="${CLASE_AGREGAR}">${cant ? "Agregar otro" : "Agregar"}</button>
      ${cant ? `<span class="en-pedido">${cant} en tu pedido</span>` : ""}`;
  }
  const clave = claveLinea(id), cant = pedido.get(clave)?.cant || 0;
  if (!cant) return `<button type="button" data-agregar="${id}" class="${CLASE_AGREGAR}">Agregar</button>`;
  if (CANTIDAD_MANUAL) return campoCantidad(clave, cant, nombre, zona);
  return stepper(nombre, `data-menos="${id}"`, `data-mas="${id}"`, cant);
}

/* ---------- cabecera / hero ---------- */
function pintarCabecera() {
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
  $("footer-horario").textContent = "Todos los días · " + Object.values(TURNOS).map(t => `${t.nombre}: ${horaTexto(t.inicio)} – ${horaTexto(t.fin)}${t.recojoHasta != null ? ` (recojo en tienda hasta ${horaTexto(t.recojoHasta)}; después, solo delivery)` : ""}${t.provisional ? " (provisional)" : ""}`).join(". ");
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
      <span class="image-more" aria-hidden="true">↗</span>
    </button>
    <div class="product-labels">${(p.etiquetas || []).map(t => `<span>${t}</span>`).join('')}</div>
    <h3><button type="button" data-producto="${p.id}">${p.nombre}</button></h3>
    <p class="product-description">${p.desc}</p>
    <div class="product-actions"><span class="product-price">${precioTexto(p)}</span><div data-control="${p.id}" data-zona="carta">${controlAgregar(p.id)}</div></div>
  </article>`;
}

/* [[subgrupo, platos], ...] respetando el orden de data.js. Las secciones
   sin subgrupos devuelven un solo bloque con subgrupo vacío. */
function agruparPorSubgrupo(platos) {
  const grupos = [];
  for (const p of platos) {
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo[0] === (p.subgrupo || '')) ultimo[1].push(p);
    else grupos.push([p.subgrupo || '', [p]]);
  }
  return grupos;
}

function pintarCarta() {
  const consulta = ($("buscar-carta")?.value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const secciones = cartaVisible().map(s => ({ ...s, platos: s.platos.filter(p =>
    `${p.nombre} ${p.subgrupo || ""} ${s.nombre}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(consulta)) })).filter(s => s.platos.length);
  $("busqueda-resultado").textContent = consulta ? `${secciones.reduce((n,s) => n+s.platos.length, 0)} productos encontrados` : '';
  $("carta").innerHTML = secciones.map((s, i) => `
    <section id="${s.id}" class="menu-section">
      <div class="section-heading"><h2>${s.nombre}</h2><span>${String(s.platos.length).padStart(2, '0')} opciones</span></div>
      ${s.nota ? `<p class="section-note">${s.nota}</p>` : ''}
      ${agruparPorSubgrupo(s.platos).map(([subgrupo, platos], g) => `
        ${subgrupo ? `<h3 class="subgroup-heading">${subgrupo}</h3>` : ''}
        <div class="product-grid">${platos.map((p, n) => tarjetaPlato(p) + (!consulta && i === 0 && g === 0 && n === 1 ? promoCarta() : '')).join('')}</div>`).join('')}
    </section>`).join('') || '<p class="sin-resultados">No encontramos ese producto en esta carta. Prueba otro nombre o cambia de turno.</p>';
  document.querySelectorAll('[data-ir]').forEach(b => { b.hidden = !secciones.some(s => s.id === b.dataset.ir); });
}


function promoCarta() {
  const promo = TURNOS[turnoVisible()].promo;
  return `<aside class="menu-promo"><span>${promo.antes}</span><em>${promo.destacado}</em>
    <p>${promo.texto}</p>
    <a href="${enlaceSeccion(promo.enlace)}">${promo.cta} ↗</a><span class="promo-flower" aria-hidden="true">✳</span></aside>`;
}

let productoActivo = null;
/* completo: al abrir la ficha. Después, cada cambio del carrito solo
   refresca lo que depende de él, sin rehacer lo que el cliente eligió. */
function pintarDetalleProducto(completo = false) {
  if (!productoActivo) return;
  const p = PLATOS[productoActivo];
  const turnos = Object.keys(TURNOS).filter(id => TURNOS[id].carta.some(s => s.platos.some(item => item.id === p.id)));
  const turno = turnos.includes(turnoVisible()) ? turnoVisible() : turnos[0];
  $("producto-imagen").src = p.imagen; $("producto-imagen").alt = p.nombre;
  $("producto-titulo").textContent = p.nombre;
  $("producto-categoria").textContent = TURNOS[turno].carta.find(s => s.id === p.categoria).nombre;
  $("producto-descripcion").textContent = p.desc || "Consulta los ingredientes y acompañamientos con Checo’s al pedir.";
  $("producto-precio").textContent = precioTexto(p);
  $("producto-horario").textContent = (enHorario(p.id) ? 'Disponible ahora · ' : SIN_HORARIO ? 'Pedido anticipado · ' : 'Fuera de horario · ') + turnos.map(id => `${TURNOS[id].nombre}: ${horarioTurno(id)}`).join(' / ');
  if (personalizable(p)) {
    delete $("producto-control").dataset.control;
    if (completo) pintarEleccion(p); else refrescarEleccion(p);
    return;
  }
  $("producto-opciones").innerHTML = "";
  $("producto-control").dataset.control = p.id;
  $("producto-control").dataset.zona = "ficha";
  $("producto-control").innerHTML = controlAgregar(p.id, "ficha");
  const cant = cantidadPlato(p.id);
  $("producto-confirmacion").textContent = cant ? `${cant} en tu pedido` : '';
}
function abrirProducto(id) {
  if (!PLATOS[id]) return;
  productoActivo = id;
  eleccion = eleccionNueva();
  pintarDetalleProducto(true);
  $("producto-dialog").showModal();
  document.body.style.overflow = 'hidden';
}

let observadorCarta;
function observarCarta() {
  observadorCarta?.disconnect();
  const pistas = () => [...document.querySelectorAll(".pista")];
  observadorCarta = new IntersectionObserver(entradas => {
    entradas.forEach(en => {
      if (!en.isIntersecting) return;
      guardarVista(en.target.id);
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
