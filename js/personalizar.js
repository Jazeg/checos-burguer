/* ============================================================
   Ficha con elección: tamaño, opciones obligatorias, cremas y
   cantidad antes de agregar al pedido. La ficha se arma una vez
   al abrirse; después solo se refrescan precio, botón y avisos,
   para no perder lo marcado ni el foco. Depende de carrito.js
   y carta.js.
   ============================================================ */

let eleccion = null;
const eleccionNueva = () => ({ tamano: null, opciones: {}, cremas: {}, cant: 1 });

function faltantes(p) {
  const falta = [];
  if (p.tamanos && !eleccion.tamano) falta.push("el tamaño");
  for (const g of p.opciones || []) if (!eleccion.opciones[g.nombre]) falta.push(g.nombre.toLowerCase());
  return falta;
}

const precioEleccion = p => precioLinea({ id: p.id, ...eleccion });

const chip = (tipo, name, valor, marcado, texto, data) =>
  `<label class="opcion-chip"><input type="${tipo}" name="${name}" value="${attr(valor)}" ${data} ${marcado ? "checked" : ""}><span>${texto}</span></label>`;

function formularioEleccion(p) {
  const grupos = [];
  if (p.tamanos) grupos.push(`<fieldset class="opcion-grupo"><legend>Tamaño</legend><div class="opcion-chips">
    ${p.tamanos.map(t => chip("radio", "tamano", t.nombre, eleccion.tamano === t.nombre, `${t.nombre} <small>${soles(t.precio)}</small>`, "data-elegir-tamano")).join("")}
  </div></fieldset>`);
  (p.opciones || []).forEach((g, i) => grupos.push(`<fieldset class="opcion-grupo"><legend>${g.nombre}<small>Elige una</small></legend><div class="opcion-chips">
    ${g.valores.map(v => chip("radio", "opcion-" + i, v, eleccion.opciones[g.nombre] === v, v, `data-elegir-opcion="${attr(g.nombre)}"`)).join("")}
  </div></fieldset>`));
  if (p.cremas) grupos.push(`<fieldset class="opcion-grupo"><legend>Cremas<small>Todas las que quieras. La primera porción de cada una es gratis; cada porción extra +${soles(CREMA_EXTRA)}</small></legend><div class="cremas-lista">
    ${p.cremas.map(c => `<div class="crema" data-crema-fila="${attr(c)}">
      <span class="crema-nombre">${c}<small data-crema-extra></small></span>
      <div class="crema-contador">
        <button type="button" data-crema-menos="${attr(c)}" aria-label="Quitar una porción de ${attr(c)}">−</button>
        <output data-crema-cant aria-live="polite">0</output>
        <button type="button" data-crema-mas="${attr(c)}" aria-label="Agregar una porción de ${attr(c)}">+</button>
      </div>
    </div>`).join("")}
  </div></fieldset>`);
  return grupos.join("") + bloqueSugerencia(p);
}

/* p.ej. en los sándwiches del desayuno: "Vaso 250 ml de jugo de naranja" */
function bloqueSugerencia(p) {
  const s = PLATOS[p.sugerencia];
  if (!s) return "";
  const tamano = s.tamanos?.[0];
  const todos = p.acompanamientos ? `<button type="button" data-ver-seccion="${p.acompanamientos}" class="sugerencia-todos">Ver todos los acompañamientos ↗</button>` : "";
  return `<div class="sugerencia"><p><span>¿Lo acompañas?</span> ${tamano ? tamano.nombre + " de jugo de " + s.nombre.toLowerCase() : s.nombre}
      · <strong>${soles(tamano ? tamano.precio : s.precio)}</strong> <em data-sugerencia-cant></em></p>
    ${disponibleAhora(s.id) ? `<button type="button" data-sugerencia="${s.id}" class="agregar">Agregar</button>` : ""}${todos}</div>`;
}

function controlEleccion(p) {
  const cantidad = CANTIDAD_MANUAL
    ? `<input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="4" class="cantidad-input" data-config-cantidad value="${eleccion.cant}" aria-label="Cantidad de ${attr(p.nombre)}">`
    : stepper(p.nombre, "data-config-menos", "data-config-mas", `<span data-config-valor>${eleccion.cant}</span>`, false);
  return `<div class="config-pedido">${cantidad}<button type="button" data-config-agregar class="agregar config-agregar"></button></div>
    <p class="config-destino" data-config-destino hidden></p>
    <div class="config-confirmar" data-salir-confirmar hidden role="alertdialog" aria-labelledby="confirmar-salir">
      <p id="confirmar-salir">Aún no agregaste ${p.nombre}. ¿Seguro que quieres salir sin agregarlo?</p>
      <div><button type="button" data-seguir-eligiendo class="agregar config-agregar">Seguir eligiendo</button>
        <button type="button" data-salir-sin-agregar class="config-elegir">Salir sin agregar</button></div>
    </div>
    <div class="config-confirmar" data-config-confirmar hidden role="alertdialog" aria-labelledby="confirmar-cremas">
      <p id="confirmar-cremas">¿Seguro que lo quieres sin cremas?</p>
      <div><button type="button" data-sin-cremas class="agregar config-agregar">Sí, sin cremas</button>
        <button type="button" data-elegir-cremas class="config-elegir">Elegir cremas</button></div>
    </div>
    <p class="config-falta" role="status"></p><span class="fuera-horario" data-config-fuera hidden>Fuera de horario</span>`;
}

function pintarEleccion(p) {
  salidaPendiente = destinoTrasAgregar = null;
  $("producto-opciones").innerHTML = formularioEleccion(p);
  $("producto-control").innerHTML = controlEleccion(p);
  const cant = cantidadPlato(p.id);
  $("producto-confirmacion").textContent = cant ? `${cant} en tu pedido` : "";
  refrescarEleccion(p);
}

function refrescarEleccion(p = PLATOS[productoActivo]) {
  if (!p || !eleccion) return;
  const control = $("producto-control"), falta = faltantes(p), disponible = disponibleAhora(p.id);
  const boton = control.querySelector("[data-config-agregar]");
  if (!boton) return;
  if (Object.keys(eleccion.cremas).length) confirmarSinCremas(false);
  boton.hidden = !disponible;
  control.querySelector("[data-config-fuera]").hidden = disponible;
  boton.disabled = falta.length > 0;
  boton.textContent = `Agregar · ${soles(precioEleccion(p) * eleccion.cant)}`;
  control.querySelector(".config-falta").textContent = falta.length && disponible ? `Elige ${falta.join(" y ")}.` : "";
  const valor = control.querySelector("[data-config-valor]");
  if (valor) valor.textContent = eleccion.cant;
  const campo = control.querySelector("[data-config-cantidad]");
  if (campo && document.activeElement !== campo) campo.value = eleccion.cant;
  $("producto-opciones").querySelectorAll("[data-crema-fila]").forEach(fila => {
    const n = eleccion.cremas[fila.dataset.cremaFila] || 0;
    fila.classList.toggle("crema-elegida", n > 0);
    fila.querySelector("[data-crema-cant]").textContent = n;
    fila.querySelector("[data-crema-extra]").textContent = n > 1 ? `+${soles((n - 1) * CREMA_EXTRA)}` : "";
    fila.querySelector("[data-crema-menos]").disabled = n === 0;
    fila.querySelector("[data-crema-mas]").disabled = n >= MAX_PORCIONES_CREMA;
  });
  const sugerida = PLATOS[p.sugerencia], marca = $("producto-opciones").querySelector("[data-sugerencia-cant]");
  if (sugerida && marca) {
    const n = pedido.get(claveLinea(sugerida.id, { tamano: sugerida.tamanos?.[0].nombre }))?.cant || 0;
    marca.textContent = n ? `${n} en tu pedido` : "";
  }
}

function cambiarEleccion(input) {
  const d = input.dataset;
  if ("elegirTamano" in d) eleccion.tamano = input.value;
  if (d.elegirOpcion) eleccion.opciones[d.elegirOpcion] = input.value;
  refrescarEleccion();
}

function cambiarCrema(crema, delta) {
  if (!productoActivo) return;
  const n = Math.min(MAX_PORCIONES_CREMA, Math.max(0, (eleccion.cremas[crema] || 0) + delta));
  if (n) eleccion.cremas[crema] = n; else delete eleccion.cremas[crema];
  refrescarEleccion();
}

/* ---------- salir de la ficha sin agregar ----------
   Ir a una sugerencia sin haber agregado el plato siempre pregunta; cerrar
   (✕, Esc, clic fuera, "Revisar mi pedido") solo si ya se eligió algo. Así
   quien solo mira la foto no se topa con la pregunta. */
let salidaPendiente = null;
/* destino que el cliente quiso antes de agregar ("Seguir eligiendo"):
   se le lleva ahí apenas agrega el plato */
let destinoTrasAgregar = null;
const textoDestino = d => d.seccion ? "Al agregarlo te llevamos a los acompañamientos." : d.pedido ? "Al agregarlo te mostramos tu pedido." : "";
const eleccionTocada = () => !!(eleccion && (eleccion.tamano || Object.keys(eleccion.opciones).length || Object.keys(eleccion.cremas).length || eleccion.cant !== 1));

/* el evento "close" llega después y devuelve el scroll a la página: si
   eso ocurre a mitad del desplazamiento suave, lo corta. Se devuelve aquí,
   antes de bajar. */
function salirDeFicha(destino) {
  $("producto-dialog").close();
  document.body.style.overflow = $("hoja").dataset.abierto === "si" ? "hidden" : "";
  if (destino.seccion) $(destino.seccion)?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (destino.pedido) abrirHoja(true);
}

function intentarSalir(destino = {}) {
  const p = PLATOS[productoActivo];
  const preguntar = personalizable(p) && disponibleAhora(p.id) && (destino.seccion || eleccionTocada());
  if (!preguntar) return salirDeFicha(destino);
  salidaPendiente = destino;
  confirmarSinCremas(false);
  const caja = $("producto-control").querySelector("[data-salir-confirmar]");
  caja.hidden = false;
  $("producto-control").querySelector(".config-pedido").hidden = true;
  caja.scrollIntoView({ behavior: "smooth", block: "center" });
  caja.querySelector("[data-seguir-eligiendo]").focus({ preventScroll: true });
}

function cancelarSalida() {
  const control = $("producto-control"), caja = control.querySelector("[data-salir-confirmar]");
  if (salidaPendiente && textoDestino(salidaPendiente)) {
    destinoTrasAgregar = salidaPendiente;
    const nota = control.querySelector("[data-config-destino]");
    nota.textContent = textoDestino(destinoTrasAgregar);
    nota.hidden = false;
  }
  salidaPendiente = null;
  if (!caja || caja.hidden) return;
  caja.hidden = true;
  control.querySelector(".config-pedido").hidden = false;
  control.querySelector("[data-config-agregar]").focus();
}

function confirmarSalida() { const destino = salidaPendiente || {}; salidaPendiente = null; salirDeFicha(destino); }

/* plato con cremas y ninguna elegida: se pregunta antes de agregar, sin
   bloquear la página como un confirm() del navegador */
function confirmarSinCremas(mostrar) {
  const control = $("producto-control"), caja = control.querySelector("[data-config-confirmar]");
  if (!caja || caja.hidden === !mostrar) return;
  caja.hidden = !mostrar;
  control.querySelector(".config-pedido").hidden = mostrar;
  if (mostrar) caja.querySelector("[data-sin-cremas]").focus();
}

function irACremas() {
  confirmarSinCremas(false);
  const grupo = $("producto-opciones").querySelector("[data-crema-fila]");
  grupo?.closest("fieldset").scrollIntoView({ behavior: "smooth", block: "center" });
  grupo?.querySelector("[data-crema-mas]").focus({ preventScroll: true });
}

/* las opciones van en el orden del plato y las cremas en el de la lista,
   así la misma elección siempre cae en la misma línea del pedido */
function agregarEleccion(sinCremas = false) {
  const p = PLATOS[productoActivo];
  if (!p || faltantes(p).length) return;
  if (p.cremas && !sinCremas && !Object.keys(eleccion.cremas).length) { cancelarSalida(); confirmarSinCremas(true); return; }
  const opciones = Object.fromEntries((p.opciones || []).map(g => [g.nombre, eleccion.opciones[g.nombre]]));
  const cremas = Object.fromEntries((p.cremas || []).filter(c => eleccion.cremas[c]).map(c => [c, eleccion.cremas[c]]));
  const cant = eleccion.cant;
  if (!agregarAlPedido(p.id, { tamano: eleccion.tamano, opciones, cremas }, cant)) return;
  const destino = destinoTrasAgregar || {};
  destinoTrasAgregar = null;
  salirDeFicha(destino);
  avisar(`Agregado correctamente · ${cant} × ${p.nombre}`);
}

function agregarSugerencia(id) {
  const s = PLATOS[id];
  if (s) agregarAlPedido(id, { tamano: s.tamanos?.[0].nombre }, 1);
}

function cantidadEleccion(input, confirmar) {
  const limpio = input.value.replace(/\D/g, "").slice(0, 4);
  if (limpio !== input.value) input.value = limpio;
  const n = parseInt(limpio, 10);
  if (n > 0) eleccion.cant = n;
  else if (confirmar) { eleccion.cant = 1; input.value = "1"; }
  refrescarEleccion();
}
