/* ============================================================
   Carrito de pedido: estado, cálculos y armado del texto
   que se envía por WhatsApp. No toca el DOM directamente
   (eso lo hace app.js) salvo por pintarPedido().
   ============================================================ */

const PLATOS = Object.fromEntries(
  CARTA.flatMap(s => s.platos.map(p => [p.id, { ...p, categoria: s.id }]))
);
const pedido = new Map();
let modoEntrega = "Delivery";

const soles = n => "S/ " + n.toFixed(2);

function totalPedido() {
  let t = 0;
  pedido.forEach((cant, id) => t += PLATOS[id].precio * cant);
  return t;
}

function unidadesPedido() {
  let n = 0;
  pedido.forEach(c => n += c);
  return n;
}

function sumarAlPedido(id, delta) {
  const actual = pedido.get(id) || 0;
  const nuevo = actual + delta;
  if (nuevo <= 0) pedido.delete(id); else pedido.set(id, nuevo);
  pintarPedido();
}

function eliminarDelPedido(id) {
  pedido.delete(id);
  pintarPedido();
}

function textoComanda(detalle) {
  if (!pedido.size) return "Todavía no agregas nada.";
  const lineas = [`*Pedido — ${NEGOCIO.nombre}*`, ""];
  pedido.forEach((cant, id) => {
    const p = PLATOS[id];
    lineas.push(`${cant} × ${p.nombre} — ${soles(p.precio * cant)}`);
  });
  lineas.push("", `Total: ${soles(totalPedido())}`, `Entrega: ${modoEntrega}`);
  if (detalle) lineas.push(`${modoEntrega === "Delivery" ? "Dirección" : "Nombre"}: ${detalle}`);
  return lineas.join("\n");
}

function enlaceWhatsApp(detalle) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(textoComanda(detalle))}`;
}
