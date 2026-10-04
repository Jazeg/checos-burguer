/* ============================================================
   Pedido programado del catálogo ejecutivo. Por defecto el pedido
   es para hoy y no se pregunta nada; "¿Es para una fecha específica
   o un evento?" abre fecha, hora y detalle del evento. Se abre solo
   si lo pedido ya no se sirve hoy. El panel vive en el HTML: aquí
   solo se actualiza, para no quitarle el foco a quien escribe.
   Solo se carga en el catálogo corporativo. Depende de horarios.js
   y carrito.js.
   ============================================================ */

const DIAS_ENTREGA = 7;
/* fecha: "AAAA-MM-DD" en la zona del negocio; hora: "HH:MM" o "" */
const entrega = { abierto: false, fecha: null, fechaElegida: false, otraFecha: false, hora: "", evento: "" };

function hoyNegocio(fecha = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: ZONA_NEGOCIO, year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(fecha).map(x => [x.type, x.value]));
  return Date.UTC(+p.year, p.month - 1, +p.day);
}
/* fechas en UTC a medianoche: se formatean en UTC para que el día no se
   corra con la zona del visitante */
const isoDia = (dia, fecha = new Date()) => new Date(hoyNegocio(fecha) + dia * 864e5).toISOString().slice(0, 10);
const diasDesdeHoy = (iso, fecha = new Date()) => Math.round((Date.parse(iso + "T00:00:00Z") - hoyNegocio(fecha)) / 864e5);
const formatoFecha = (iso, opciones) => new Date(iso + "T00:00:00Z").toLocaleDateString("es-PE", { timeZone: "UTC", ...opciones }).replace(".", "").toLowerCase();
const minutosHora = hora => { const [h, m] = hora.split(":").map(Number); return h * 60 + m; };

function turnosDelPedido() {
  const ids = Object.keys(TURNOS).filter(t => [...pedido.values()].some(l => TURNOS[t].carta.some(s => s.platos.some(p => p.id === l.id))));
  return ids.length ? ids : Object.keys(TURNOS);
}

/* un turno que cruza la medianoche (la cena) nunca termina "hoy" */
function terminoHoy(id, fecha = new Date()) {
  const { inicio, fin } = TURNOS[id];
  return inicio < fin && estadoHorario(fecha).minutos >= fin;
}
const diaSugerido = (fecha = new Date()) => turnosDelPedido().every(t => terminoHoy(t, fecha)) ? 1 : 0;
/* si hoy ya no se sirve lo pedido, hay que decir para cuándo */
const programarObligatorio = () => pedido.size > 0 && diaSugerido() === 1;
const programado = () => entrega.abierto || programarObligatorio();

/* "mañana lunes 5 de octubre, 8:00 a. m." */
function textoEntrega(iso, hora = "", fecha = new Date()) {
  const dias = diasDesdeHoy(iso, fecha), d = new Date(iso + "T00:00:00Z");
  return `${dias === 0 ? "hoy " : dias === 1 ? "mañana " : ""}${formatoFecha(iso, { weekday: "long" })} ${d.getUTCDate()} de ${formatoFecha(iso, { month: "long" })}`
    + (hora ? `, ${horaTexto(minutosHora(hora))}` : "");
}

function datosEntrega() {
  if (!programado()) return null;
  if (!entrega.fechaElegida || !entrega.fecha) entrega.fecha = isoDia(diaSugerido());
  return { texto: textoEntrega(entrega.fecha, entrega.hora), evento: entrega.evento.trim() };
}

function errorEntrega() {
  if (!programado() || !entrega.fecha) return "";
  const dias = diasDesdeHoy(entrega.fecha);
  if (dias < 0) return "Elige una fecha desde hoy.";
  if (dias === 0 && entrega.hora && minutosHora(entrega.hora) <= estadoHorario().minutos) return "Esa hora ya pasó. Elige otra.";
  return "";
}
const entregaValida = () => !errorEntrega();

/* las fichas se arman una vez por día; luego solo cambia cuál está marcada */
function pintarDias() {
  const cont = $("entrega-dias");
  if (cont.dataset.desde !== isoDia(0)) {
    cont.dataset.desde = isoDia(0);
    cont.innerHTML = Array.from({ length: DIAS_ENTREGA }, (_, i) => {
      const iso = isoDia(i);
      return `<button type="button" class="dia-chip" data-entrega-dia="${iso}"
        aria-label="${i === 0 ? "Hoy, " : i === 1 ? "Mañana, " : ""}${formatoFecha(iso, { weekday: "long", day: "numeric", month: "long" })}">
        <small>${i === 0 ? "Hoy" : i === 1 ? "Mañana" : formatoFecha(iso, { weekday: "short" })}</small><strong>${+iso.slice(8)}</strong><span>${formatoFecha(iso, { month: "short" })}</span></button>`;
    }).join("") + `<button type="button" class="dia-chip dia-otra" data-entrega-otra><small>Otra</small><strong>+</strong><span>fecha</span></button>`;
    $("entrega-otra-fecha").min = isoDia(0);
  }
  const enFichas = !entrega.otraFecha && cont.querySelector(`[data-entrega-dia="${entrega.fecha}"]`);
  cont.querySelectorAll("[data-entrega-dia]").forEach(b => b.setAttribute("aria-pressed", enFichas && b.dataset.entregaDia === entrega.fecha));
  cont.querySelector("[data-entrega-otra]").setAttribute("aria-pressed", !enFichas);
  $("entrega-otra-fecha").hidden = !!enFichas;
  if (!enFichas && document.activeElement !== $("entrega-otra-fecha")) $("entrega-otra-fecha").value = entrega.fecha || "";
}

function pintarEntrega() {
  if (!$("programar")) return;
  const abierto = programado(), obligatorio = programarObligatorio(), datos = datosEntrega();
  $("programar-toggle").setAttribute("aria-expanded", abierto);
  $("programar-toggle").setAttribute("aria-disabled", obligatorio);
  $("programar-icono").textContent = abierto ? "−" : "+";
  $("programar-panel").hidden = !abierto;
  $("programar-resumen").textContent = abierto
    ? (obligatorio && !entrega.fechaElegida ? "Hoy ya no servimos lo que elegiste: indícanos para cuándo." : `Para ${datos.texto}`)
    : "Si no eliges nada, lo preparamos para hoy.";
  if (abierto) pintarDias();
  $("entrega-error").textContent = errorEntrega();
}

function alternarProgramar() {
  if (programarObligatorio()) return;
  entrega.abierto = !entrega.abierto;
  pintarPedido();
}
function elegirDia(iso) { entrega.fecha = iso; entrega.fechaElegida = true; entrega.otraFecha = false; pintarPedido(); }
function mostrarOtraFecha() { entrega.otraFecha = true; pintarPedido(); $("entrega-otra-fecha").focus(); }
function cambiarEntrega(campo) {
  if (campo.id === "entrega-otra-fecha" && campo.value) { entrega.fecha = campo.value; entrega.fechaElegida = true; }
  if (campo.id === "entrega-hora") entrega.hora = campo.value;
  if (campo.id === "entrega-evento") entrega.evento = campo.value;
  pintarPedido();
}

/* ---------- memoria (memoria.js) ---------- */
const ENTREGA_INICIAL = { abierto: false, fecha: null, fechaElegida: false, otraFecha: false, hora: "", evento: "" };
function restaurarEntrega(guardada) {
  Object.assign(entrega, ENTREGA_INICIAL, guardada);
  if (entrega.fecha && diasDesdeHoy(entrega.fecha) < 0) Object.assign(entrega, { fecha: null, fechaElegida: false, otraFecha: false });
  $("entrega-hora").value = entrega.hora;
  $("entrega-evento").value = entrega.evento;
}
function reiniciarEntrega() { restaurarEntrega({}); }
