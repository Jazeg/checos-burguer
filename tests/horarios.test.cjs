const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const ctx = vm.createContext({ Intl, Date, Map, localStorage: { getItem: () => null, setItem: () => {} }, pintarPedido() {}, actualizarTurno() {} });
for (const file of ['data', 'desayunos', 'horarios', 'carrito', 'recomendador']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/' + file + '.js'), 'utf8'), ctx);
const run = code => vm.runInContext(code, ctx);
for (const [hora, esperado] of [['00:00:00','cena'], ['00:40:00','cena'], ['01:39:59','cena'], ['01:40:00',null], ['06:59:59',null], ['07:00:00','desayuno'], ['10:59:59','desayuno'], ['11:00:00',null], ['14:59:59',null], ['15:00:00',null], ['16:59:59',null], ['17:00:00','cena'], ['23:59:59','cena']]) {
  test('Lima ' + hora, () => assert.equal(run(`estadoHorario(new Date('2026-09-30T${hora}-05:00')).activo`), esperado));
}
test('Es independiente de la zona horaria del visitante', () => {
  assert.equal(run("estadoHorario(new Date('2026-10-01T06:39:59Z')).activo"), 'cena');
  assert.equal(run("estadoHorario(new Date('2026-10-01T06:40:00Z')).activo"), null);
});
test('Siguiente apertura durante ambos cierres', () => {
  assert.equal(run("estadoHorario(new Date('2026-09-30T04:00:00-05:00')).siguiente"), 'desayuno');
  assert.equal(run("estadoHorario(new Date('2026-09-30T16:00:00-05:00')).siguiente"), 'cena');
});
test('La disponibilidad no cambia al explorar otra carta', () => {
  run("turnoManual = 'desayuno'");
  assert.equal(run("enHorario('am-pan-huevo', new Date('2026-09-30T18:00:00-05:00'))"), false);
  assert.equal(run("enHorario('hamburguesas-1', new Date('2026-09-30T18:00:00-05:00'))"), true);
  assert.equal(run("enHorario('hamburguesas-1', new Date('2026-09-30T12:00:00-05:00'))"), false);
});
test('Recomendaciones limitadas a la carta visible, incluso con historial y carrito', () => {
  run("turnoManual = 'desayuno'; pedido.set('hamburguesas-1', 1)");
  for (let i = 0; i < 20; i++) assert.equal(run("(() => { const elegido = recomendarCasa('grupo', 'lleno'); return platosVisibles().some(p => p.id === elegido.id); })()"), true);
  assert.equal(run("recomendarListaPorGustos('normal', 'si').every(p => p.id.startsWith('am'))"), true);
  run("turnoManual = 'cena'; pedido.clear()");
  assert.equal(run("recomendarListaPorGustos('normal', 'no').some(p => p.id.startsWith('am'))"), false);
});
test('Catálogo con identificadores únicos y recursos existentes', () => {
  /* las secciones compartidas aparecen en las dos cartas: se cuentan una vez */
  const ids = run('[...new Set([...CARTA, ...CARTA_DESAYUNO])].flatMap(s => s.platos.map(p => p.id))');
  assert.equal(ids.length, new Set(ids).size);
  assert.equal(run('[...CARTA, ...CARTA_DESAYUNO].flatMap(s => s.platos).every(p => PLATOS[p.id].precio === p.precio)'), true);
  const imgs = run('[...CARTA, ...CARTA_DESAYUNO].flatMap(s => s.platos.map(p => p.imagen))');
  for (const img of imgs) assert.ok(fs.existsSync(path.join(__dirname, '..', img)), img);
});

test('Precios transcritos y total del pedido', () => {
  assert.equal(run('PLATOS["hamburguesas-1"].precio'), 8);
  assert.equal(run('PLATOS["hamburguesas-2"].precio'), 9);
  assert.equal(run('PLATOS["bebidas-calientes-1"].precio'), 3);
  assert.equal(run('PLATOS["combos-1"].precio'), 13.5);
  assert.equal(run('PLATOS["sandwiches-1"].categoria'), 'hamburguesas');
  run('pedido.clear(); pedido.set(claveLinea("hamburguesas-1"), nuevaLinea("hamburguesas-1", {}, 2)); pedido.set(claveLinea("extras-2"), nuevaLinea("extras-2"))');
  assert.equal(run('totalPedido()'), 17.5);
  assert.match(run('textoComanda("Prueba")'), /Checo’s Burger/);
  assert.match(run('enlaceWhatsApp("Prueba")'), /wa.me\/51947788574/);
  run('pedido.clear()');
});
test('Los combos pendientes no se publican', () => {
  assert.equal(run('COMBOS_PENDIENTES.map(p => p.id).join()'), 'combos-4,combos-9,combos-10,combos-13');
  assert.equal(run('COMBOS_PENDIENTES.some(p => PLATOS[p.id])'), false);
  assert.equal(run('CARTA.find(s => s.id === "combos").platos.length'), 9);
});

test('Las bebidas compartidas están disponibles en ambos turnos', () => {
  for (const hora of ['08:00:00', '18:00:00']) assert.equal(run(`enHorario('bebidas-calientes-1', new Date('2026-09-30T${hora}-05:00'))`), true);
  assert.equal(run("enHorario('bebidas-calientes-1', new Date('2026-09-30T12:00:00-05:00'))"), false);
});
test('Bebidas y extras no se recomiendan como platos principales', () => {
  run("turnoManual = 'cena'; pedido.clear()");
  assert.equal(run('platosComida().every(p => p.tipo === "comida")'), true);
  for (let i = 0; i < 20; i++) assert.equal(run('recomendarCasa("solo", "normal").tipo'), 'comida');
});

for (const corporativo of [false, true]) {
  test('Acceso y horario del catálogo ' + (corporativo ? 'corporativo' : 'público'), () => {
    const scope = vm.createContext({ Intl, Date, Map });
    for (const file of ['data', ...(corporativo ? ['desayunos'] : []), 'horarios', 'carrito']) {
      vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/' + file + '.js'), 'utf8'), scope);
    }
    const exec = code => vm.runInContext(code, scope);
    assert.equal(exec('ES_CORPORATIVO'), corporativo);
    assert.equal(exec('Object.hasOwn(TURNOS, "almuerzo")'), false);
    assert.equal(exec('Object.hasOwn(PLATOS, "al1")'), false);
    assert.equal(exec('Object.hasOwn(PLATOS, "am-pan-huevo")'), corporativo);
    assert.equal(exec("disponibleAhora('am-pan-huevo', new Date('2026-10-02T08:00:00-05:00'))"), corporativo);
    assert.equal(exec('CANTIDAD_MANUAL'), corporativo);
    /* el ejecutivo pide a cualquier hora; el público solo en su turno */
    for (const hora of ['03:00:00', '12:00:00', '18:00:00']) {
      assert.equal(exec(`disponibleAhora('hamburguesas-1', new Date('2026-10-02T${hora}-05:00'))`), corporativo || hora === '18:00:00', hora);
    }
    if (corporativo) assert.equal(exec("disponibleAhora('am-pan-huevo', new Date('2026-10-02T21:00:00-05:00'))"), true);
    assert.equal(exec("recojoDisponible(new Date('2026-10-02T01:20:00-05:00'))"), corporativo);
    assert.equal(exec("estadoHorario(new Date('2026-10-02T08:00:00-05:00')).activo"), corporativo ? 'desayuno' : null);
    assert.equal(exec("estadoHorario(new Date('2026-10-02T12:00:00-05:00')).siguiente"), 'cena');
    exec("estadoActual = estadoHorario(new Date('2026-10-02T08:00:00-05:00')); turnoManual = 'desayuno'");
    assert.equal(exec('turnoVisible()'), corporativo ? 'desayuno' : 'cena');
    assert.equal(exec("disponibleAhora('hamburguesas-1', new Date('2026-10-02T18:00:00-05:00'))"), true);
  });
}

const publicoCtx = vm.createContext({ Intl, Date, Map });
for (const file of ['data', 'horarios', 'carrito']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/' + file + '.js'), 'utf8'), publicoCtx);
const publico = code => vm.runInContext(code, publicoCtx);

test('Recojo en tienda hasta la 1:00 a. m.; delivery hasta la 1:40 a. m.', () => {
  for (const [hora, esperado] of [['17:00:00', true], ['23:59:59', true], ['00:59:59', true], ['01:00:00', false], ['01:39:59', false], ['12:00:00', true]]) {
    assert.equal(publico(`recojoDisponible(new Date('2026-09-30T${hora}-05:00'))`), esperado, hora);
  }
});

test('Cremas: primera porción gratis, cada porción extra suma S/ 0.50 por unidad', () => {
  assert.equal(run('PLATOS["hamburguesas-1"].cremas.length'), 8);
  assert.equal(run('PLATOS["combos-1"].cremas.includes("Salsa wolf")'), true);
  assert.equal(run('PLATOS["jugos-1"].cremas'), null);
  assert.equal(run('PLATOS["extras-2"].cremas'), null);
  assert.equal(run('precioLinea(nuevaLinea("hamburguesas-1", { cremas: { Mayonesa: 1, Ketchup: 1, Mostaza: 1, "Ají": 1 } }))'), 8);
  assert.equal(run('precioLinea(nuevaLinea("hamburguesas-1", { cremas: { Mayonesa: 2, "Ají": 2 } }))'), 9);
  assert.equal(run('precioLinea(nuevaLinea("hamburguesas-1", { cremas: { Mayonesa: 1, "Ají": 3 } }))'), 9);
  assert.equal(run('precioLinea(nuevaLinea("hamburguesas-1", { cremas: { Ketchup: 5 } }))'), 10);
  run('pedido.clear(); pedido.set("x", nuevaLinea("hamburguesas-1", { cremas: { Mayonesa: 2 } }, 3))');
  assert.equal(run('totalPedido()'), 25.5);
  assert.match(run('textoComanda("")'), /3 × Hamburguesa de casa — S\/ 25\.50\n   Cremas: Mayonesa ×2/);
  run('pedido.clear()');
});

test('La misma elección se agrupa; otra elección va en otra línea', () => {
  assert.equal(run('claveLinea("hamburguesas-1", { cremas: { Mostaza: 1, Ketchup: 1 } }) === claveLinea("hamburguesas-1", { cremas: { Ketchup: 1, Mostaza: 1 } })'), true);
  assert.notEqual(run('claveLinea("hamburguesas-1", { cremas: { Mostaza: 1 } })'), run('claveLinea("hamburguesas-1", { cremas: { Mostaza: 2 } })'));
  assert.notEqual(run('claveLinea("hamburguesas-1")'), run('claveLinea("hamburguesas-1", { cremas: { Mostaza: 1 } })'));
});

test('Desayuno ejecutivo: precios, opciones, cremas y jugos en dos tamaños', () => {
  const precios = { 'am-pan-huevo': 3, 'am-pan-palta': 3, 'am-caldo-gallina': 12, 'am-sandwich-deshilachado': 9,
    'am-sandwich-huevo-queso': 9, 'am-sandwich-queso-tocino': 9, 'am-pan-pollo': 8, 'am-hamburguesa-carne': 8, 'am-hamburguesa-filete': 8 };
  for (const [id, precio] of Object.entries(precios)) assert.equal(run(`PLATOS["${id}"].precio`), precio, id);
  assert.equal(run('PLATOS["am-pan-huevo"].cremas.join()'), 'Mostaza,Ají');
  assert.equal(run('PLATOS["am-caldo-gallina"].cremas'), null);
  assert.equal(run('PLATOS["am-pan-pollo"].opciones[0].valores.join()'), 'Huevo,Queso,Papas al hilo');
  assert.equal(run('PLATOS["am-hamburguesa-carne"].opciones.map(g => g.valores.join("/")).join()'), 'Papas fritas/Papas al hilo,Queso/Jamón');
  assert.equal(run('PLATOS["am-sandwich-deshilachado"].sugerencia'), 'am-jugos-naranja');
  assert.equal(run('CARTA_DESAYUNO.some(s => s.id === PLATOS["am-sandwich-deshilachado"].acompanamientos)'), true);
  const jugosNoche = run('[...CARTA.find(s => s.id === "jugos").platos, ...CARTA.find(s => s.id === "jugos-leche").platos].map(p => p.id)');
  for (const id of [...jugosNoche.map(id => 'am-' + id), 'am-jugos-naranja']) {
    assert.equal(run(`precioLinea(nuevaLinea("${id}", { tamano: "Vaso 250 ml" }))`), 3, id);
    assert.equal(run(`precioLinea(nuevaLinea("${id}", { tamano: "Medio litro" }))`), 6, id);
  }
  assert.equal(run('PLATOS["jugos-leche-10"].precio'), 9);
  assert.equal(run('PLATOS["am-jugos-leche-10"].nombre === PLATOS["jugos-leche-10"].nombre'), true);
  assert.equal(run("enHorario('am-jugos-1', new Date('2026-09-30T08:00:00-05:00'))"), true);
  assert.equal(run("enHorario('am-jugos-1', new Date('2026-09-30T18:00:00-05:00'))"), false);
  assert.equal(run('precioLinea(nuevaLinea("am-hamburguesa-carne", { opciones: { Papas: "Papas al hilo", "Acompañante": "Queso" }, cremas: { "Ají": 2 } }))'), 8.5);
});

test('Ejecutivo: pedido anticipado fuera de horario y fecha en la comanda', () => {
  run('pedido.clear(); pedido.set(claveLinea("am-pan-huevo"), nuevaLinea("am-pan-huevo", {}, 150))');
  assert.equal(run("pedidoAnticipado(new Date('2026-09-30T08:00:00-05:00'))"), false);
  assert.equal(run("pedidoAnticipado(new Date('2026-09-30T21:00:00-05:00'))"), true);
  assert.match(run('textoComanda("Municipalidad", "2026-10-05T07:30")'), /Para: lunes, 5 de octubre/);
  assert.match(run('textoComanda("Municipalidad")'), /Para: lo antes posible/);
  run('pedido.clear()');
  assert.doesNotMatch(publico('textoComanda("x")'), /Para:/);
});
