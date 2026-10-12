/* Horarios diarios en la zona del restaurante; el cierre es exclusivo.
   Desayunos corporativos: horario y catálogo provisionales. */
const ES_CORPORATIVO = typeof CARTA_DESAYUNO !== "undefined";
const TURNOS = {
  ...(ES_CORPORATIVO ? {
  desayuno: { nombre: 'Desayunos', inicio: 7 * 60, fin: 11 * 60, provisional: true,
    titulo: 'Empieza rico.<br><span>Sin apuro.</span>',
    descripcion: 'Desayunos para equipos de municipalidades y entidades públicas. Empieza el día con el sabor de Checo’s.',
    imagen: 'assets/desayuno/productos/pan-huevo.jpg', alt: 'Pan con huevo de Checo’s',
    secundario: { texto: 'Algo para acompañar', enlace: 'bebidas-calientes' },
    promo: { antes: 'ASÍ EMPIEZA', destacado: 'tu día.', texto: 'Un buen pan. Un café calientito. Un momento para ti.', enlace: 'bebidas-calientes', cta: 'Elige tu bebida' },
    carta: CARTA_DESAYUNO },
  } : {}),
  /* El local atiende hasta fin; el delivery sale solo hasta deliveryHasta.
     avisoDelivery minutos antes empieza la cuenta regresiva. */
  cena: { nombre: ES_CORPORATIVO ? 'Cenas' : 'Hamburguesas', inicio: 17 * 60, fin: 60, deliveryHasta: 40, avisoDelivery: 20,
    titulo: 'A la plancha.<br><span>Hasta tarde.</span>',
    descripcion: 'Tu hamburguesa favorita, papas crocantes y todos los antojos para cerrar bien el día.',
    imagen: HERO.imagen, alt: HERO.alt,
    secundario: { texto: 'Descubre los combos', enlace: 'combos' },
    promo: { antes: 'MEJOR EN', destacado: 'combo.', texto: 'Todos los combos incluyen gaseosa.', enlace: 'combos', cta: 'Descubre los combos' },
    carta: CARTA }
};
const ZONA_NEGOCIO = 'America/Lima';
const relojNegocio = new Intl.DateTimeFormat('es-PE', {
  timeZone: ZONA_NEGOCIO, hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
});
function horaTexto(minutos) {
  const h = Math.floor(minutos / 60), m = minutos % 60;
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a. m.' : 'p. m.'}`;
}
/* "hasta la 1:00 a. m." pero "hasta las 12:40 a. m." */
function hastaTexto(minutos) { return `hasta ${Math.floor(minutos / 60) % 12 === 1 ? "la" : "las"} ${horaTexto(minutos)}`; }
function horarioTurno(id) {
  const t = TURNOS[id];
  return `${horaTexto(t.inicio)} – ${horaTexto(t.fin)}`;
}
function estadoHorario(fecha = new Date()) {
  const partes = Object.fromEntries(relojNegocio.formatToParts(fecha).map(p => [p.type, p.value]));
  const minutos = Number(partes.hour) * 60 + Number(partes.minute);
  const activo = Object.keys(TURNOS).find(id => {
    const { inicio, fin } = TURNOS[id];
    return inicio < fin ? minutos >= inicio && minutos < fin : minutos >= inicio || minutos < fin;
  }) || null;
  const siguiente = Object.keys(TURNOS).sort((a, b) =>
    ((TURNOS[a].inicio - minutos + 1440) % 1440) - ((TURNOS[b].inicio - minutos + 1440) % 1440))[0];
  return { activo, siguiente, minutos };
}
let turnoManual = null;
let estadoActual = estadoHorario();
function turnoVisible() { return (Object.hasOwn(TURNOS, turnoManual) ? turnoManual : null) || estadoActual.activo || estadoActual.siguiente; }
function cartaVisible() { return TURNOS[turnoVisible()].carta; }
/* El catálogo ejecutivo pide a cualquier hora: lo que está fuera de su
   turno sale como pedido anticipado, con fecha y hora de entrega. */
const SIN_HORARIO = ES_CORPORATIVO;
function enHorario(id, fecha = new Date()) {
  const activo = estadoHorario(fecha).activo;
  return !!activo && TURNOS[activo].carta.some(s => s.platos.some(p => p.id === id));
}
function disponibleAhora(id, fecha = new Date()) {
  if (!SIN_HORARIO) return enHorario(id, fecha);
  return Object.values(TURNOS).some(t => t.carta.some(s => s.platos.some(p => p.id === id)));
}
function pedidoDisponible() { return pedido.size > 0 && [...pedido.values()].every(l => disponibleAhora(l.id)); }
function pedidoAnticipado(fecha = new Date()) { return SIN_HORARIO && [...pedido.values()].some(l => !enHorario(l.id, fecha)); }
/* Minutos que quedan para pedir delivery en el turno activo: null si el
   turno no tiene corte, 0 si ya pasó. Fuera del turno no hay pedidos, así
   que solo limita dentro de él. El ejecutivo programa la entrega, así que
   no se le limita. */
function minutosDelivery(fecha = new Date()) {
  if (SIN_HORARIO) return null;
  const { activo, minutos } = estadoHorario(fecha);
  const t = TURNOS[activo];
  if (!t || t.deliveryHasta == null) return null;
  const desdeInicio = m => (m - t.inicio + 1440) % 1440;
  return Math.max(0, desdeInicio(t.deliveryHasta) - desdeInicio(minutos));
}
function deliveryDisponible(fecha = new Date()) { return minutosDelivery(fecha) !== 0; }
