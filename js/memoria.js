/* ============================================================
   Memoria del pedido en este teléfono: el carrito en curso
   sobrevive a una recarga o a cerrar la página por error, la
   página vuelve a la sección donde estaba y cada pedido enviado
   queda en "Mis pedidos" para repetirlo o borrarlo. Todo vive en localStorage
   y nunca sale del dispositivo. Público y ejecutivo guardan por
   separado. Depende de carrito.js y hoja.js.
   ============================================================ */

const MEMORIA = ES_CORPORATIVO ? "corp" : "pub";
const CLAVE_BORRADOR = `checos_borrador_v1_${MEMORIA}`;
const CLAVE_ULTIMO = `checos_ultimo_v1_${MEMORIA}`; /* formato anterior al historial */
const CLAVE_PEDIDOS = `checos_pedidos_v1_${MEMORIA}`;
const MAX_PEDIDOS = 20;
const CLAVE_VISTA = `checos_vista_v1_${MEMORIA}`;
const HORA_MS = 36e5;
const VIGENCIA = { borrador: 12 * HORA_MS, vista: 2 * HORA_MS, pedido: 90 * 24 * HORA_MS };

function leerMemoria(clave, vigencia) {
  try {
    const d = JSON.parse(localStorage.getItem(clave));
    return d && Date.now() - d.guardado < vigencia ? d : null;
  } catch { return null; }
}
function escribirMemoria(clave, datos) {
  try {
    if (datos) localStorage.setItem(clave, JSON.stringify({ ...datos, guardado: Date.now() }));
    else localStorage.removeItem(clave);
  } catch { /* sin almacenamiento la carta funciona igual */ }
}

/* solo id, cantidad y elección: los precios se recalculan con data.js */
const lineasParaGuardar = () => [...pedido.values()].map(({ id, cant, tamano, opciones, cremas }) => ({ id, cant, tamano, opciones, cremas }));

/* descarta lo que ya no está en la carta, o cuyo tamaño, opción o crema cambió */
function lineasValidas(lineas) {
  return (Array.isArray(lineas) ? lineas : []).filter(l => {
    const p = PLATOS[l?.id];
    if (!p || !(l.cant > 0)) return false;
    if (l.tamano && !p.tamanos?.some(t => t.nombre === l.tamano)) return false;
    if (Object.entries(l.opciones || {}).some(([g, v]) => !p.opciones?.find(o => o.nombre === g)?.valores.includes(v))) return false;
    return Object.keys(l.cremas || {}).every(c => p.cremas?.includes(c));
  });
}

/* suma al carrito sin borrar lo que ya tiene; devuelve cuántas líneas entraron */
function sumarLineas(lineas) {
  const validas = lineasValidas(lineas);
  for (const l of validas) {
    const eleccion = { tamano: l.tamano || null, opciones: l.opciones || {}, cremas: l.cremas || {} };
    const clave = claveLinea(l.id, eleccion), previa = pedido.get(clave);
    if (previa) previa.cant = Math.min(MAX_CANTIDAD, previa.cant + l.cant);
    else pedido.set(clave, nuevaLinea(l.id, eleccion, Math.min(MAX_CANTIDAD, Math.floor(l.cant))));
  }
  return validas.length;
}
function cargarLineas(lineas) { pedido.clear(); return sumarLineas(lineas); }

/* ---------- carrito en curso ---------- */
function guardarBorrador() {
  const programa = SIN_HORARIO ? { entrega: { ...entrega } } : {};
  escribirMemoria(CLAVE_BORRADOR, pedido.size ? { lineas: lineasParaGuardar(), ...programa } : null);
}

function restaurarBorrador() {
  const d = leerMemoria(CLAVE_BORRADOR, VIGENCIA.borrador);
  if (!d) return;
  cargarLineas(d.lineas);
  if (SIN_HORARIO && d.entrega && pedido.size) restaurarEntrega(d.entrega);
}

/* ---------- pedidos enviados ("Mis pedidos") ----------
   Del más nuevo al más viejo. total y entrega son los de ese momento. */
function pedidosGuardados() {
  let pedidos;
  try { pedidos = JSON.parse(localStorage.getItem(CLAVE_PEDIDOS))?.pedidos; } catch { pedidos = null; }
  if (!Array.isArray(pedidos)) {
    const anterior = leerMemoria(CLAVE_ULTIMO, VIGENCIA.pedido);
    pedidos = anterior ? [{ id: String(anterior.guardado), enviado: anterior.guardado, lineas: anterior.lineas }] : [];
  }
  return pedidos.filter(p => p && Date.now() - p.enviado < VIGENCIA.pedido && Array.isArray(p.lineas)).slice(0, MAX_PEDIDOS);
}
function escribirPedidos(pedidos) {
  try {
    localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify({ pedidos: pedidos.slice(0, MAX_PEDIDOS) }));
    localStorage.removeItem(CLAVE_ULTIMO);
  } catch { /* sin almacenamiento no hay historial */ }
}
function guardarPedidoEnviado(datos) {
  const enviado = Date.now();
  escribirPedidos([{ id: `${enviado.toString(36)}-${Math.random().toString(36).slice(2, 7)}`, enviado, ...datos }, ...pedidosGuardados()]);
}
function eliminarPedidoGuardado(id) { escribirPedidos(pedidosGuardados().filter(p => p.id !== id)); }
function borrarPedidosGuardados() { escribirPedidos([]); }
const pedidoGuardado = id => pedidosGuardados().find(p => p.id === id);

function ultimoPedido() {
  const u = pedidosGuardados()[0], lineas = lineasValidas(u?.lineas);
  return lineas.length ? { ...u, guardado: u.enviado, lineas } : null;
}

function cuandoFue(ms) {
  const dias = Math.floor((hoyLocal() - hoyLocal(new Date(ms))) / 864e5);
  return dias <= 0 ? "Hoy" : dias === 1 ? "Ayer" : `Hace ${dias} días`;
}
const hoyLocal = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

function bloqueRepetir() {
  const u = ultimoPedido();
  if (!u) return "";
  const lineas = u.lineas.map(l => nuevaLinea(l.id, l, l.cant));
  const unidades = lineas.reduce((n, l) => n + l.cant, 0), total = lineas.reduce((t, l) => t + precioLinea(l) * l.cant, 0);
  const nombres = lineas.slice(0, 3).map(l => `${l.cant} × ${PLATOS[l.id].nombre}`).join(", ") + (lineas.length > 3 ? ` y ${lineas.length - 3} más` : "");
  return `<div class="repetir">
    <p class="repetir-titulo">Tu último pedido</p>
    <p class="repetir-detalle">${nombres}</p>
    <p class="repetir-meta">${cuandoFue(u.guardado)} · ${unidades === 1 ? "1 producto" : unidades + " productos"} · ${soles(total)} con precios de hoy</p>
    <button type="button" data-repetir-pedido class="${CLASE_AGREGAR}">Repetir mi último pedido</button>
  </div>`;
}

function repetirUltimo() {
  const u = ultimoPedido();
  if (!u) return;
  cargarLineas(u.lineas);
  pintarPedido();
  avisar("Cargamos tu último pedido. Revísalo antes de enviarlo.");
}

/* tras abrir WhatsApp el pedido pasa a "Mis pedidos" y el carrito queda limpio.
   Va en un setTimeout: el clic todavía tiene que usar el enlace con el
   pedido escrito. */
function cerrarPedidoEnviado() {
  guardarPedidoEnviado({ lineas: lineasParaGuardar(), total: totalPedido(), modo: modoEntrega, entrega: SIN_HORARIO ? datosEntrega() : null });
  setTimeout(() => {
    pedido.clear();
    if (SIN_HORARIO) reiniciarEntrega();
    abrirHoja(false);
    pintarPedido();
    pintarAccesoPedidos();
    avisar("Abrimos WhatsApp con tu pedido. Lo guardamos en Mis pedidos.");
  }, 0);
}

/* ---------- sección donde estaba ---------- */
function guardarVista(seccion) { escribirMemoria(CLAVE_VISTA, { seccion, turno: turnoManual }); }
const leerVista = () => location.hash ? null : leerMemoria(CLAVE_VISTA, VIGENCIA.vista);

function irAVista(vista) {
  if (!vista?.seccion || !$(vista.seccion)) return;
  try { history.scrollRestoration = "manual"; } catch { /* navegador antiguo */ }
  $(vista.seccion).scrollIntoView({ behavior: "instant", block: "start" });
}

/* por encima de la carta no hay sección que recordar */
let vigiaScroll = false;
function vigilarInicio() {
  if (vigiaScroll) return;
  vigiaScroll = true;
  requestAnimationFrame(() => {
    vigiaScroll = false;
    if ($("carta").getBoundingClientRect().top > innerHeight / 2) guardarVista(null);
  });
}
