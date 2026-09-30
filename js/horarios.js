/* Horarios diarios en la zona del restaurante; el cierre es exclusivo.
   Desayunos: horario y catálogo provisionales para esta demostración. */
const TURNOS = {
  desayuno: { nombre: 'Desayunos', inicio: 7 * 60, fin: 11 * 60,
    titulo: 'Empieza rico.<br><span>Sin apuro.</span>',
    descripcion: 'Pan recién preparado, algo calientito y una buena razón para empezar el día.',
    imagen: 'assets/images/desayuno.svg', alt: 'Ilustración de un desayuno con café, pan y huevo',
    carta: CARTA_DESAYUNO },
  cena: { nombre: 'Hamburguesas', inicio: 17 * 60, fin: 40,
    titulo: 'A la plancha.<br><span>Hasta tarde.</span>',
    descripcion: 'Tu hamburguesa favorita, papas crocantes y todos los antojos para cerrar bien el día.',
    imagen: HERO.imagen, alt: HERO.alt, carta: CARTA }
};
const ZONA_NEGOCIO = 'America/Lima';
const relojNegocio = new Intl.DateTimeFormat('es-PE', {
  timeZone: ZONA_NEGOCIO, hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
});
function horaTexto(minutos) {
  const h = Math.floor(minutos / 60), m = minutos % 60;
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a. m.' : 'p. m.'}`;
}
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
function turnoVisible() { return turnoManual || estadoActual.activo || estadoActual.siguiente; }
function cartaVisible() { return TURNOS[turnoVisible()].carta; }
function disponibleAhora(id, fecha = new Date()) {
  const activo = estadoHorario(fecha).activo;
  return !!activo && TURNOS[activo].carta.some(s => s.platos.some(p => p.id === id));
}
function pedidoDisponible() { return pedido.size > 0 && [...pedido.keys()].every(id => disponibleAhora(id)); }
