/* ============================================================
   Motor de recomendación: "Deja que decida la casa" y el
   mini-quiz por gustos. Solo lógica, sin tocar el DOM (eso lo
   hace app.js). Todo el historial vive en localStorage, en el
   teléfono del cliente — nunca sale de ahí.
   ============================================================ */

const RECOM_HISTORIAL_KEY = "bc_historial_pedidos";
const RECOM_RECIENTES_KEY = "bc_recomendados_recientes";
const RECOM_MAX_RECIENTES = 4;

const PLATOS_COMIDA = Object.values(PLATOS).filter(p => p.categoria !== "bebidas");

function leerHistorialPedidos() {
  try { return JSON.parse(localStorage.getItem(RECOM_HISTORIAL_KEY)) || []; }
  catch { return []; }
}

function registrarPedidoEnHistorial(ids) {
  const historial = leerHistorialPedidos().concat(ids).slice(-40);
  localStorage.setItem(RECOM_HISTORIAL_KEY, JSON.stringify(historial));
}

function leerRecomendadosRecientes() {
  try { return JSON.parse(localStorage.getItem(RECOM_RECIENTES_KEY)) || []; }
  catch { return []; }
}

function registrarRecomendados(ids) {
  const recientes = [...ids, ...leerRecomendadosRecientes()].slice(0, RECOM_MAX_RECIENTES);
  localStorage.setItem(RECOM_RECIENTES_KEY, JSON.stringify(recientes));
}

/* filtra, pero si el filtro deja la lista vacía, no descarta nada
   (mejor una recomendación menos precisa que ninguna) */
function filtrarConRespaldo(lista, filtro) {
  const filtrada = lista.filter(filtro);
  return filtrada.length ? filtrada : lista;
}

function sinRecomendadosRecientes(lista) {
  return filtrarConRespaldo(lista, p => !leerRecomendadosRecientes().includes(p.id));
}

function sinLosDelCarrito(lista) {
  return filtrarConRespaldo(lista, p => !pedido.has(p.id));
}

function elegirAlAzar(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function mezclar(lista) {
  return [...lista].sort(() => Math.random() - 0.5);
}

function categoriasEnCarrito() {
  const categorias = new Set();
  pedido.forEach((_, id) => categorias.add(PLATOS[id]?.categoria));
  return categorias;
}

/* ---------- "Deja que decida la casa" ----------
   Dos toques de contexto real (para cuántos, cómo de lleno) más
   lo que ya sabemos del cliente (carrito actual, historial). */
function recomendarCasa(personas, saciedad) {
  // las bebidas solo entran a tallar como complemento de algo que ya
  // eligió — abrir la recomendación con "toma una gaseosa" no ayuda
  let candidatos = pedido.size ? Object.values(PLATOS) : PLATOS_COMIDA;

  if (personas === "solo") candidatos = filtrarConRespaldo(candidatos, p => p.personas <= 1);
  else if (personas === "dos") candidatos = filtrarConRespaldo(candidatos, p => p.personas <= 2);
  else if (personas === "grupo") candidatos = filtrarConRespaldo(candidatos, p => p.personas >= 3);

  // si ya hay algo en el carrito, complementa con otra categoría en vez de repetir
  const categorias = categoriasEnCarrito();
  if (categorias.size) {
    candidatos = filtrarConRespaldo(candidatos, p => !categorias.has(p.categoria));
  }

  candidatos = sinLosDelCarrito(candidatos);
  candidatos = filtrarConRespaldo(candidatos, p => p.categoria === "bebidas" || p.saciedad === saciedad);

  const historial = leerHistorialPedidos();
  let elegido;

  if (historial.length) {
    // ¿tiene un favorito claro? 60% de probabilidad de repetirlo
    const conteo = {};
    historial.forEach(id => conteo[id] = (conteo[id] || 0) + 1);
    const favoritoId = Object.keys(conteo).sort((a, b) => conteo[b] - conteo[a])[0];
    const favorito = candidatos.find(p => p.id === favoritoId);

    if (favorito && Math.random() < 0.6) {
      elegido = favorito;
    } else {
      const sinProbar = candidatos.filter(p => !historial.includes(p.id));
      elegido = elegirAlAzar(sinRecomendadosRecientes(sinProbar.length ? sinProbar : candidatos));
    }
  } else {
    // primera vez: la apuesta más segura es lo más pedido
    const destacados = candidatos.filter(p => p.etiquetas?.some(t => /pedid/i.test(t)));
    elegido = elegirAlAzar(sinRecomendadosRecientes(destacados.length ? destacados : candidatos));
  }

  if (elegido) registrarRecomendados([elegido.id]);
  return elegido;
}

/* ---------- mini-quiz "prefiero elegir por gustos" ----------
   Devuelve varias opciones (no una sola) para armar el pedido
   directo desde ahí, tipo carril de opciones. */
function recomendarListaPorGustos(saciedad, picante, cantidad = 3) {
  let candidatos = sinLosDelCarrito(PLATOS_COMIDA);
  candidatos = filtrarConRespaldo(candidatos, p => p.saciedad === saciedad);

  if (picante === "si") candidatos = filtrarConRespaldo(candidatos, p => p.picante);
  else if (picante === "no") candidatos = filtrarConRespaldo(candidatos, p => !p.picante);

  candidatos = sinRecomendadosRecientes(candidatos);

  const elegidos = mezclar(candidatos).slice(0, Math.min(cantidad, candidatos.length));
  if (elegidos.length) registrarRecomendados(elegidos.map(p => p.id));
  return elegidos;
}
