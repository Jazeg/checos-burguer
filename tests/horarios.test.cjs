const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const ctx = vm.createContext({ Intl, Date, Map, localStorage: { getItem: () => null, setItem: () => {} }, pintarPedido() {}, actualizarTurno() {} });
for (const file of ['data', 'desayunos', 'horarios', 'carrito', 'recomendador', 'entrega']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/' + file + '.js'), 'utf8'), ctx);
const run = code => vm.runInContext(code, ctx);
for (const [hora, esperado] of [['00:00:00','cena'], ['00:40:00','cena'], ['00:59:59','cena'], ['01:00:00',null], ['06:59:59',null], ['07:00:00','desayuno'], ['10:59:59','desayuno'], ['11:00:00',null], ['14:59:59',null], ['15:00:00',null], ['16:59:59',null], ['17:00:00','cena'], ['23:59:59','cena']]) {
  test('Lima ' + hora, () => assert.equal(run(`estadoHorario(new Date('2026-09-30T${hora}-05:00')).activo`), esperado));
}
test('Es independiente de la zona horaria del visitante', () => {
  assert.equal(run("estadoHorario(new Date('2026-10-01T05:59:59Z')).activo"), 'cena');
  assert.equal(run("estadoHorario(new Date('2026-10-01T06:00:00Z')).activo"), null);
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
  /* Las bebidas calientes son los mismos productos en ambas cartas. */
  const ids = run('[...new Set([...CARTA, ...CARTA_DESAYUNO].flatMap(s => s.platos))].map(p => p.id)');
  assert.equal(ids.length, new Set(ids).size);
  assert.equal(run('[...CARTA, ...CARTA_DESAYUNO].flatMap(s => s.platos).every(p => PLATOS[p.id].precio === p.precio)'), true);
  const imgs = run('[...CARTA, ...CARTA_DESAYUNO].flatMap(s => s.platos.map(p => p.imagen))');
  for (const img of imgs) assert.ok(fs.existsSync(path.join(__dirname, '..', img)), img);
});

test('Las infusiones son tres productos independientes, iguales en ambas cartas', () => {
  for (const carta of ['CARTA', 'CARTA_DESAYUNO']) {
    assert.equal(run(`${carta}.find(s => s.id === "bebidas-calientes").platos.map(p => p.nombre).join()`), 'Café,Café con leche,Té,Anís,Manzanilla');
  }
  for (const id of ['bebidas-calientes-3', 'bebidas-calientes-4', 'bebidas-calientes-5']) {
    assert.equal(run(`PLATOS["${id}"].precio`), 2.5);
    assert.equal(run(`PLATOS["${id}"].tipo`), 'bebida');
  }
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
  assert.match(run('enlaceWhatsApp("Prueba")'), /wa.me\/51936538325/);
  run('pedido.clear()');
});
test('Los combos pendientes no se publican', () => {
  assert.equal(run('COMBOS_PENDIENTES.map(p => p.id).join()'), 'combos-4,combos-9,combos-10');
  assert.equal(run('COMBOS_PENDIENTES.some(p => PLATOS[p.id])'), false);
  assert.equal(run('CARTA.find(s => s.id === "combos").platos.length'), 10);
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
    assert.equal(exec("deliveryDisponible(new Date('2026-10-02T00:50:00-05:00'))"), corporativo);
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

test('Atención hasta la 1:00 a. m.; delivery hasta las 12:40 a. m., con cuenta regresiva desde las 12:20', () => {
  for (const [hora, esperado] of [['17:00:00', true], ['23:59:59', true], ['00:39:59', true], ['00:40:00', false], ['00:59:59', false], ['12:00:00', true]]) {
    assert.equal(publico(`deliveryDisponible(new Date('2026-09-30T${hora}-05:00'))`), esperado, hora);
  }
  for (const [hora, esperado] of [['23:00:00', 100], ['00:20:00', 20], ['00:39:00', 1], ['00:40:00', 0], ['12:00:00', null]]) {
    assert.equal(publico(`minutosDelivery(new Date('2026-09-30T${hora}-05:00'))`), esperado, hora);
  }
});

test('Gaseosa personal y combos eligen bebida pequeña de plástico', () => {
  assert.equal(run('PLATOS["bebidas-4"].opciones[0].valores.join()'), 'Inca Kola,Coca-Cola,Del Valle');
  assert.equal(run('CARTA.find(s => s.id === "combos").platos.every(p => PLATOS[p.id].opciones[0].nombre === "Bebida")'), true);
  assert.equal(run('PLATOS["extras-4"].precio'), 2);
  assert.equal(run('PLATOS["extras-6"].precio'), 2);
});

test('Cremas: primera porción gratis, cada porción extra suma S/ 0.20 por unidad', () => {
  assert.equal(run('PLATOS["hamburguesas-1"].cremas.length'), 8);
  assert.equal(run('PLATOS["combos-1"].cremas.includes("Salsa wolf")'), true);
  assert.equal(run('PLATOS["jugos-1"].cremas'), null);
  assert.equal(run('PLATOS["extras-2"].cremas'), null);
  assert.equal(run('precioLinea(nuevaLinea("hamburguesas-1", { cremas: { Mayonesa: 1, Ketchup: 1, Mostaza: 1, "Ají": 1 } }))'), 8);
  assert.equal(run('precioLinea(nuevaLinea("hamburguesas-1", { cremas: { Mayonesa: 2, "Ají": 2 } }))'), 8.4);
  assert.equal(run('precioLinea(nuevaLinea("hamburguesas-1", { cremas: { Mayonesa: 1, "Ají": 3 } }))'), 8.4);
  assert.equal(run('precioLinea(nuevaLinea("hamburguesas-1", { cremas: { Ketchup: 5 } }))'), 8.8);
  run('pedido.clear(); pedido.set("x", nuevaLinea("hamburguesas-1", { cremas: { Mayonesa: 2 } }, 3))');
  assert.equal(run('totalPedido()'), 24.6);
  assert.match(run('textoComanda("")'), /3 × Hamburguesa de casa — S\/ 24\.60\n   Cremas: Mayonesa ×2/);
  assert.match(run('textoComanda("Jr. Comercio 123", null, "987 654 321")'), /Dirección: Jr\. Comercio 123\nCelular: 987 654 321$/);
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
    const medioLitro = id === 'am-jugos-naranja' ? 6 : run(`PLATOS["${id.slice(3)}"].precio`);
    assert.equal(run(`precioLinea(nuevaLinea("${id}", { tamano: "Vaso 250 ml" }))`), 3, id);
    assert.equal(run(`precioLinea(nuevaLinea("${id}", { tamano: "Medio litro (500 ml)" }))`), medioLitro, id);
  }
  assert.equal(run('precioLinea(nuevaLinea("am-jugos-4", { tamano: "Medio litro (500 ml)" }))'), 6.5);
  assert.equal(run('precioLinea(nuevaLinea("am-jugos-leche-10", { tamano: "Medio litro (500 ml)" }))'), 9);
  assert.equal(run('PLATOS["am-jugos-leche-10"].precio'), 3);
  assert.equal(run('PLATOS["jugos-leche-10"].precio'), 9);
  assert.equal(run('PLATOS["am-jugos-leche-10"].nombre === PLATOS["jugos-leche-10"].nombre'), true);
  assert.equal(run("enHorario('am-jugos-1', new Date('2026-09-30T08:00:00-05:00'))"), true);
  assert.equal(run('PLATOS["jugos-1"].desc'), 'Medio litro (500 ml).');
  assert.equal(run('PLATOS["jugos-leche-12"].desc'), 'Medio litro (500 ml).');
  assert.equal(run('PLATOS["am-jugos-1"].desc + PLATOS["am-jugos-leche-12"].desc'), '');
  assert.equal(run("enHorario('am-jugos-1', new Date('2026-09-30T18:00:00-05:00'))"), false);
  assert.equal(run('precioLinea(nuevaLinea("am-hamburguesa-carne", { opciones: { Papas: "Papas al hilo", "Acompañante": "Queso" }, cremas: { "Ají": 2 } }))'), 8.2);
});

test('Ejecutivo: pedido anticipado fuera de horario y fecha en la comanda', () => {
  run('pedido.clear(); pedido.set(claveLinea("am-pan-huevo"), nuevaLinea("am-pan-huevo", {}, 150))');
  assert.equal(run("pedidoAnticipado(new Date('2026-09-30T08:00:00-05:00'))"), false);
  assert.equal(run("pedidoAnticipado(new Date('2026-09-30T21:00:00-05:00'))"), true);
  assert.match(run('textoComanda("Municipalidad", { texto: "mañana lunes 5 de octubre, 7:30 a. m.", evento: "Reunión de gerencia" })'), /^\*Pedido anticipado[^]*Para: mañana lunes 5 de octubre, 7:30 a\. m\.\nEvento: Reunión de gerencia/);
  assert.doesNotMatch(run('textoComanda("Municipalidad", { texto: "hoy", evento: "" })'), /Evento:/);
  assert.doesNotMatch(run('textoComanda("Municipalidad")'), /Para:/);
  run('pedido.clear()');
  assert.doesNotMatch(publico('textoComanda("x")'), /Para:/);
});

test('Pedido programado: fecha y hora opcional, prellenado según lo pedido', () => {
  const tarde = "new Date('2026-09-30T14:00:00-05:00')";
  assert.equal(run(`isoDia(1, ${tarde})`), '2026-10-01');
  assert.equal(run(`textoEntrega('2026-09-30', '', ${tarde})`).replace('setiembre', 'septiembre'), 'hoy miércoles 30 de septiembre');
  assert.equal(run(`textoEntrega('2026-10-01', '', ${tarde})`), 'mañana jueves 1 de octubre');
  assert.equal(run(`textoEntrega('2026-10-04', '08:30', ${tarde})`), 'domingo 4 de octubre, 8:30 a. m.');
  assert.equal(run(`textoEntrega('2026-12-24', '20:00', ${tarde})`), 'jueves 24 de diciembre, 8:00 p. m.');
  run('pedido.clear(); pedido.set(claveLinea("am-pan-huevo"), nuevaLinea("am-pan-huevo", {}, 50))');
  assert.equal(run(`diaSugerido(${tarde})`), 1);
  assert.equal(run("diaSugerido(new Date('2026-09-30T08:00:00-05:00'))"), 0);
  run('pedido.set(claveLinea("hamburguesas-1"), nuevaLinea("hamburguesas-1"))');
  assert.equal(run(`diaSugerido(${tarde})`), 0);
  run('pedido.clear()');
});

test('Cena: sugiere gaseosa personal y lleva a bebidas, salvo en combos', () => {
  for (const id of ['hamburguesas-1', 'sandwiches-6', 'broaster-1', 'salchipapas-1', 'club-sandwiches-1', 'enchiladas-1', 'alitas-1']) {
    assert.equal(run(`PLATOS["${id}"].sugerencia`), 'bebidas-4', id);
    assert.equal(run(`PLATOS["${id}"].acompanamientos`), 'bebidas', id);
  }
  assert.equal(run('PLATOS["combos-1"].sugerencia'), null);
  assert.equal(run('PLATOS["bebidas-4"].nombre'), 'Gaseosa personal');
});

test('Cena: papas y ensalada obligatorias según la sección', () => {
  const grupos = id => run(`(PLATOS["${id}"].opciones || []).map(g => g.nombre + ":" + g.valores.join("/")).join()`);
  for (const id of ['hamburguesas-1', 'sandwiches-6', 'sandwiches-10', 'hamburguesas-8', 'enchiladas-1', 'enchiladas-10']) {
    assert.equal(grupos(id), 'Papas:Papas fritas/Papas al hilo,Ensalada:Con ensalada/Sin ensalada', id);
  }
  for (const id of ['salchipapas-1', 'broaster-1']) assert.equal(grupos(id), 'Ensalada:Con ensalada/Sin ensalada', id);
  for (const id of ['club-sandwiches-1', 'alitas-1', 'bebidas-9']) assert.equal(grupos(id), '', id);
  assert.equal(run('PLATOS["am-hamburguesa-carne"].opciones.map(g => g.nombre).join()'), 'Papas,Acompañante');
  assert.equal(run('detalleLinea(nuevaLinea("hamburguesas-1", { opciones: { Papas: "Papas al hilo", Ensalada: "Sin ensalada" } }))'), 'Papas al hilo · Sin ensalada · Sin cremas');
});

test('Memoria: borrador, último pedido y líneas que ya no existen', () => {
  const datos = new Map();
  const almacen = { getItem: k => datos.has(k) ? datos.get(k) : null, setItem: (k, v) => datos.set(k, String(v)), removeItem: k => datos.delete(k) };
  const m = vm.createContext({ Intl, Date, Map, localStorage: almacen, pintarPedido() {}, actualizarTurno() {} });
  for (const file of ['data', 'horarios', 'carrito', 'memoria']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/' + file + '.js'), 'utf8'), m);
  const ex = code => vm.runInContext(code, m);
  assert.equal(ex('claveLinea("hamburguesas-1", { tamano: null })'), ex('claveLinea("hamburguesas-1")'));
  assert.equal(ex(`lineasValidas([
    { id: "hamburguesas-1", cant: 2, opciones: { Papas: "Papas al hilo", Ensalada: "Con ensalada" }, cremas: { Mayonesa: 2 } },
    { id: "no-existe", cant: 1 },
    { id: "hamburguesas-1", cant: 1, cremas: { Mayonesa: 1 } },
    { id: "hamburguesas-1", cant: 1, cremas: { Wasabi: 1 } },
    { id: "jugos-1", cant: 0 }
  ]).length`), 1);
  ex('const e = { opciones: { Papas: "Papas al hilo", Ensalada: "Con ensalada" }, cremas: { Mayonesa: 2 } }; pedido.set(claveLinea("hamburguesas-1", e), nuevaLinea("hamburguesas-1", e, 3)); pedido.set(claveLinea("bebidas-9"), nuevaLinea("bebidas-9", {}, 2))');
  ex('guardarBorrador(); pedido.clear(); restaurarBorrador()');
  assert.equal(ex('unidadesPedido()'), 5);
  assert.equal(ex('totalPedido()'), 28.6);
  assert.equal(ex('pedido.get(claveLinea("bebidas-9")).cant'), 2);
  ex('guardarPedidoEnviado({ lineas: lineasParaGuardar(), total: totalPedido(), modo: "Delivery" }); pedido.clear(); guardarBorrador()');
  assert.equal(datos.has('checos_borrador_v1_pub'), false);
  assert.equal(ex('ultimoPedido().lineas.length'), 2);
  ex('cargarLineas(ultimoPedido().lineas)');
  assert.equal(ex('unidadesPedido()'), 5);
  /* "Pedir de nuevo" suma, no reemplaza */
  assert.equal(ex('sumarLineas(ultimoPedido().lineas)'), 2);
  assert.equal(ex('unidadesPedido()'), 10);
  datos.set('checos_borrador_v1_pub', JSON.stringify({ lineas: [{ id: "hamburguesas-1", cant: 1, opciones: { Papas: "Papas al hilo", Ensalada: "Con ensalada" } }], guardado: Date.now() - 13 * 36e5 }));
  ex('pedido.clear(); restaurarBorrador()');
  assert.equal(ex('pedido.size'), 0, 'un borrador de más de 12 horas no se restaura');
  datos.set('checos_pedidos_v1_pub', '{roto');
  assert.equal(ex('ultimoPedido()'), null);
});

test('Mis pedidos: orden, eliminar, borrar todo, tope y formato anterior', () => {
  const datos = new Map();
  const almacen = { getItem: k => datos.has(k) ? datos.get(k) : null, setItem: (k, v) => datos.set(k, String(v)), removeItem: k => datos.delete(k) };
  const m = vm.createContext({ Intl, Date, Map, localStorage: almacen });
  for (const file of ['data', 'horarios', 'carrito', 'memoria']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/' + file + '.js'), 'utf8'), m);
  const ex = code => vm.runInContext(code, m);
  /* un "último pedido" del formato anterior se conserva como primer pedido */
  datos.set('checos_ultimo_v1_pub', JSON.stringify({ lineas: [{ id: 'hamburguesas-1', cant: 1 }], guardado: Date.now() - 36e5 }));
  assert.equal(ex('pedidosGuardados().length'), 1);
  ex('guardarPedidoEnviado({ lineas: [{ id: "bebidas-4", cant: 2 }], total: 4 })');
  assert.equal(datos.has('checos_ultimo_v1_pub'), false);
  assert.equal(ex('pedidosGuardados().map(p => p.lineas[0].id).join()'), 'bebidas-4,hamburguesas-1');
  ex('eliminarPedidoGuardado(pedidosGuardados()[0].id)');
  assert.equal(ex('pedidosGuardados().map(p => p.lineas[0].id).join()'), 'hamburguesas-1');
  for (let i = 0; i < 25; i++) ex('guardarPedidoEnviado({ lineas: [{ id: "bebidas-4", cant: 1 }] })');
  assert.equal(ex('pedidosGuardados().length'), 20);
  assert.equal(ex('new Set(pedidosGuardados().map(p => p.id)).size'), 20, 'ids únicos aunque se guarden en el mismo milisegundo');
  datos.set('checos_pedidos_v1_pub', JSON.stringify({ pedidos: [{ id: 'viejo', enviado: Date.now() - 91 * 864e5, lineas: [{ id: 'bebidas-4', cant: 1 }] }] }));
  assert.equal(ex('pedidosGuardados().length'), 0, 'más de 90 días no se muestra');
  ex('guardarPedidoEnviado({ lineas: [{ id: "bebidas-4", cant: 1 }] }); borrarPedidosGuardados()');
  assert.equal(ex('pedidosGuardados().length'), 0);
});
