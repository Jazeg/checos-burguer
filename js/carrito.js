/* ============================================================
   Carrito de pedido: estado, cálculos y armado del texto
   que se envía por WhatsApp. No toca el DOM directamente
   (eso lo hace app.js) salvo por pintarPedido().

   Cada línea es un plato con su elección (tamaño, opciones y
   cremas). El mismo plato con otra elección va en otra línea,
   para que la cocina lea cada variante por separado.
   ============================================================ */

/* cremas, sugerencia: el plato puede pisar lo que define su sección
   (por ejemplo, el caldo no lleva cremas aunque su sección sí). */
const PLATOS = Object.fromEntries(
  Object.values(TURNOS).flatMap(t => t.carta).flatMap(s => s.platos.map(p => [p.id, {
    ...p, categoria: s.id,
    cremas: CREMAS[p.cremas !== undefined ? p.cremas : s.cremas] || null,
    sugerencia: p.sugerencia || s.sugerencia || null,
    acompanamientos: p.acompanamientos || s.acompanamientos || null
  }]))
);
const pedido = new Map();
let modoEntrega = "Delivery";

/* el catálogo ejecutivo pide por decenas o cientos: cantidad escrita a
   mano en vez del stepper −/+ */
const CANTIDAD_MANUAL = ES_CORPORATIVO;
const MAX_CANTIDAD = 9999;

const soles = n => "S/ " + n.toFixed(2);
const personalizable = p => !!(p && (p.tamanos || p.opciones || p.cremas));

/* sin tamaño da lo mismo null que "": la línea es la misma */
function claveLinea(id, { tamano, opciones = {}, cremas = {} } = {}) {
  return [id, tamano || "",
    ...Object.keys(opciones).sort().map(k => `${k}=${opciones[k]}`),
    ...Object.keys(cremas).sort().map(k => `${k}*${cremas[k]}`)].join("|");
}

function nuevaLinea(id, { tamano = null, opciones = {}, cremas = {} } = {}, cant = 1) {
  return { id, cant, tamano, opciones: { ...opciones }, cremas: { ...cremas } };
}

/* precio unitario: el del tamaño si lo hay, más las porciones de crema
   que pasan de la primera (gratis) de cada una */
function precioLinea(l) {
  const p = PLATOS[l.id];
  const base = l.tamano ? p.tamanos.find(t => t.nombre === l.tamano).precio : p.precio;
  return base + Object.values(l.cremas).reduce((extra, n) => extra + Math.max(0, n - 1), 0) * CREMA_EXTRA;
}

function totalPedido() {
  let t = 0;
  pedido.forEach(l => t += precioLinea(l) * l.cant);
  return t;
}

function unidadesPedido() {
  let n = 0;
  pedido.forEach(l => n += l.cant);
  return n;
}

function cantidadPlato(id) {
  let n = 0;
  pedido.forEach(l => { if (l.id === id) n += l.cant; });
  return n;
}

function agregarAlPedido(id, eleccion = {}, cant = 1) {
  actualizarTurno();
  if (!PLATOS[id] || !disponibleAhora(id) || cant < 1) return false;
  const clave = claveLinea(id, eleccion);
  const linea = pedido.get(clave);
  if (linea) linea.cant = Math.min(MAX_CANTIDAD, linea.cant + cant);
  else pedido.set(clave, nuevaLinea(id, eleccion, Math.min(MAX_CANTIDAD, cant)));
  pintarPedido();
  return true;
}

function fijarCantidad(clave, n) {
  const linea = pedido.get(clave);
  if (!linea || !Number.isFinite(n)) return;
  if (n > linea.cant) { actualizarTurno(); if (!disponibleAhora(linea.id)) return; }
  if (n <= 0) pedido.delete(clave); else linea.cant = Math.min(MAX_CANTIDAD, Math.floor(n));
  pintarPedido();
}

function cambiarCantidad(clave, delta) {
  const linea = pedido.get(clave);
  if (linea) fijarCantidad(clave, linea.cant + delta);
}

/* atajo de las tarjetas para platos sin nada que elegir */
function sumarAlPedido(id, delta) {
  if (delta > 0) agregarAlPedido(id, {}, delta);
  else cambiarCantidad(claveLinea(id), delta);
}

function eliminarDelPedido(clave) {
  pedido.delete(clave);
  pintarPedido();
}

/* "Medio litro · Papas al hilo · Cremas: Mostaza, Ají ×3" */
function detalleLinea(l) {
  const partes = [];
  if (l.tamano) partes.push(l.tamano);
  partes.push(...Object.values(l.opciones));
  if (PLATOS[l.id].cremas) {
    const elegidas = PLATOS[l.id].cremas.filter(c => l.cremas[c]);
    partes.push(elegidas.length ? "Cremas: " + elegidas.map(c => l.cremas[c] > 1 ? `${c} ×${l.cremas[c]}` : c).join(", ") : "Sin cremas");
  }
  return partes.join(" · ");
}

/* entrega (solo ejecutivo, si se programó): { texto, evento } de entrega.js */
function textoComanda(detalle, entrega = null) {
  if (!pedido.size) return "Todavía no agregas nada.";
  const lineas = [`*${pedidoAnticipado() || entrega ? "Pedido anticipado" : "Pedido"} — ${NEGOCIO.nombre}*`, ...(ES_CORPORATIVO ? ["Catálogo corporativo"] : []), ""];
  pedido.forEach(l => {
    lineas.push(`${l.cant} × ${PLATOS[l.id].nombre} — ${soles(precioLinea(l) * l.cant)}`);
    const extra = detalleLinea(l);
    if (extra) lineas.push(`   ${extra}`);
  });
  lineas.push("", `Total: ${soles(totalPedido())}`, `Entrega: ${modoEntrega}`);
  if (entrega) lineas.push(`Para: ${entrega.texto}`, ...(entrega.evento ? [`Evento: ${entrega.evento}`] : []));
  if (detalle) lineas.push(`${modoEntrega === "Delivery" ? "Dirección" : "Nombre"}: ${detalle}`);
  return lineas.join("\n");
}

function enlaceWhatsApp(detalle, entrega = null) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(textoComanda(detalle, entrega))}`;
}
