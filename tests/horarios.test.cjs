const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const ctx = vm.createContext({ Intl, Date, Map, localStorage: { getItem: () => null, setItem: () => {} }, pintarPedido() {}, actualizarTurno() {} });
for (const file of ['data', 'horarios', 'carrito', 'recomendador']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/' + file + '.js'), 'utf8'), ctx);
const run = code => vm.runInContext(code, ctx);
for (const [hora, esperado] of [['00:00:00','cena'], ['00:39:59','cena'], ['00:40:00',null], ['06:59:59',null], ['07:00:00','desayuno'], ['10:59:59','desayuno'], ['11:00:00','almuerzo'], ['14:59:59','almuerzo'], ['15:00:00',null], ['16:59:59',null], ['17:00:00','cena'], ['23:59:59','cena']]) {
  test('Lima ' + hora, () => assert.equal(run(`estadoHorario(new Date('2026-09-30T${hora}-05:00')).activo`), esperado));
}
test('Es independiente de la zona horaria del visitante', () => {
  assert.equal(run("estadoHorario(new Date('2026-10-01T05:39:59Z')).activo"), 'cena');
  assert.equal(run("estadoHorario(new Date('2026-10-01T05:40:00Z')).activo"), null);
});
test('Siguiente apertura durante ambos cierres', () => {
  assert.equal(run("estadoHorario(new Date('2026-09-30T04:00:00-05:00')).siguiente"), 'desayuno');
  assert.equal(run("estadoHorario(new Date('2026-09-30T16:00:00-05:00')).siguiente"), 'cena');
});
test('La disponibilidad no cambia al explorar otra carta', () => {
  run("turnoManual = 'desayuno'");
  assert.equal(run("disponibleAhora('am1', new Date('2026-09-30T18:00:00-05:00'))"), false);
  assert.equal(run("disponibleAhora('hamburguesas-1', new Date('2026-09-30T18:00:00-05:00'))"), true);
  assert.equal(run("disponibleAhora('hamburguesas-1', new Date('2026-09-30T12:00:00-05:00'))"), false);
});
test('Recomendaciones limitadas a la carta visible, incluso con historial y carrito', () => {
  run("turnoManual = 'desayuno'; pedido.set('hamburguesas-1', 1)");
  for (let i = 0; i < 20; i++) assert.equal(run("(() => { const elegido = recomendarCasa('grupo', 'lleno'); return platosVisibles().some(p => p.id === elegido.id); })()"), true);
  assert.equal(run("recomendarListaPorGustos('normal', 'si').every(p => p.id.startsWith('am'))"), true);
  run("turnoManual = 'cena'; pedido.clear()");
  assert.equal(run("recomendarListaPorGustos('normal', 'no').some(p => p.id.startsWith('am'))"), false);
});
test('Catálogo con identificadores únicos y recursos existentes', () => {
  const ids = run('[...CARTA, ...CARTA_DESAYUNO, ...CARTA_ALMUERZO].flatMap(s => s.platos.map(p => p.id))');
  const dinnerIds = run('CARTA.flatMap(s => s.platos.map(p => p.id))');
  assert.equal(dinnerIds.length, new Set(dinnerIds).size);
  assert.equal(run('[...CARTA, ...CARTA_DESAYUNO, ...CARTA_ALMUERZO].flatMap(s => s.platos).every(p => PLATOS[p.id].precio === p.precio)'), true);
  const imgs = run('[...CARTA, ...CARTA_DESAYUNO, ...CARTA_ALMUERZO].flatMap(s => s.platos.map(p => p.imagen))');
  for (const img of imgs) assert.ok(fs.existsSync(path.join(__dirname, '..', img)), img);
});

test('Precios transcritos y total del pedido', () => {
  assert.equal(run('PLATOS["hamburguesas-1"].precio'), 8);
  assert.equal(run('PLATOS["hamburguesas-2"].precio'), 9);
  assert.equal(run('PLATOS["bebidas-calientes-1"].precio'), 3);
  assert.equal(run('PLATOS["combos-10"].precio'), 15);
  assert.equal(run('PLATOS["combos-13"].precio'), 18);
  run('pedido.clear(); pedido.set("hamburguesas-1", 2); pedido.set("extras-2", 1)');
  assert.equal(run('totalPedido()'), 17.5);
  assert.match(run('textoComanda("Prueba")'), /Checo’s Burger/);
  assert.match(run('enlaceWhatsApp("Prueba")'), /wa.me\/51947788574/);
  run('pedido.clear()');
});
test('Almuerzos solo al mediodía, con jugos y bebidas frías compartidos', () => {
  assert.equal(run("disponibleAhora('al1', new Date('2026-09-30T12:00:00-05:00'))"), true);
  for (const h of ['08:00:00', '16:00:00', '18:00:00']) assert.equal(run(`disponibleAhora('al1', new Date('2026-09-30T${h}-05:00'))`), false);
  assert.equal(run("disponibleAhora('hamburguesas-1', new Date('2026-09-30T12:00:00-05:00'))"), false);
  for (const id of ['jugos-1', 'bebidas-1']) assert.equal(run(`disponibleAhora('${id}', new Date('2026-09-30T12:00:00-05:00'))`), true);
  run("turnoManual = 'almuerzo'; pedido.clear()");
  assert.equal(run("recomendarListaPorGustos('normal', 'si').every(p => p.id.startsWith('al'))"), true);
  run("turnoManual = null");
});
test('Las bebidas compartidas están disponibles en ambos turnos', () => {
  for (const hora of ['08:00:00', '18:00:00']) assert.equal(run(`disponibleAhora('bebidas-calientes-1', new Date('2026-09-30T${hora}-05:00'))`), true);
  assert.equal(run("disponibleAhora('bebidas-calientes-1', new Date('2026-09-30T12:00:00-05:00'))"), false);
});
test('Bebidas y extras no se recomiendan como platos principales', () => {
  run("turnoManual = 'cena'; pedido.clear()");
  assert.equal(run('platosComida().every(p => p.tipo === "comida")'), true);
  for (let i = 0; i < 20; i++) assert.equal(run('recomendarCasa("solo", "normal").tipo'), 'comida');
});
