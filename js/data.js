/* ============================================================
   Datos del negocio y de la carta.
   Reemplaza NEGOCIO, precios, textos e imágenes por los reales.
   Las imágenes son recursos propios alojados en assets/images/.

   `saciedad` ("liviano" | "normal" | "lleno"), `picante` (bool) y
   `personas` (para cuántos rinde, 1-4) alimentan al recomendador
   (js/recomendador.js) — no se muestran en la tarjeta, son solo
   para "¿qué pido hoy?".
   ============================================================ */

const NEGOCIO = {
  nombre: "Burger Co.",
  bajada: "Carta digital",
  direccion: "Jr. Comercio 000 — a media cuadra de la plaza",
  telefonoVisible: "947 788 574",
  whatsapp: "51947788574", // ← reemplazar por el número real, formato 51XXXXXXXXX
  horario: "Lunes a domingo · 5:00 pm – 11:00 pm",
  delivery: { centro: "Sin costo", otras: "S/ 3", tiempo: "25 min aprox." }
};

const HERO = {
  imagen: "assets/images/hero-burger-co.jpg",
  alt: "Hamburguesa doble con queso derretido recién salida de la plancha"
};

const CARTA = [
  {
    id: "hamburguesas", nombre: "Hamburguesas",
    nota: "Pan brioche tostado, carne de 140 g y papas al hilo en todas.",
    platos: [
      { id: "h1", nombre: "Clásica", desc: "Carne, lechuga, tomate, papas al hilo y mayonesa de la casa.", precio: 10,
        saciedad: "normal", picante: false, personas: 1,
        imagen: "assets/images/hamburguesa-clasica.jpg" },
      { id: "h2", nombre: "Royal con queso", desc: "Doble queso edam derretido sobre la plancha.", precio: 12, etiquetas: ["Más pedida"],
        saciedad: "lleno", picante: false, personas: 1,
        imagen: "assets/images/hamburguesa-royal-con-queso.jpg" },
      { id: "h3", nombre: "Doble carne", desc: "Dos carnes, dos quesos y cebolla caramelizada.", precio: 16,
        saciedad: "lleno", picante: false, personas: 1,
        imagen: "assets/images/hamburguesa-doble-carne.jpg" },
      { id: "h4", nombre: "Tocino BBQ", desc: "Tocino crocante, aros de cebolla y salsa barbacoa ahumada.", precio: 15,
        saciedad: "lleno", picante: false, personas: 1,
        imagen: "assets/images/hamburguesa-tocino-bbq.jpg" },
      { id: "h5", nombre: "La brava", desc: "Ají charapita, queso y crema picante. Pica de verdad.", precio: 14, etiquetas: ["Picante"],
        saciedad: "normal", picante: true, personas: 1,
        imagen: "assets/images/hamburguesa-la-brava.jpg" },
      { id: "h6", nombre: "A lo pobre", desc: "Huevo frito, palta y plátano frito al lado.", precio: 15,
        saciedad: "lleno", picante: false, personas: 1,
        imagen: "assets/images/hamburguesa-a-lo-pobre.jpg" },
      { id: "h7", nombre: "Pollo crocante", desc: "Filete de pollo apanado, lechuga y mayo de rocoto.", precio: 12,
        saciedad: "normal", picante: false, personas: 1,
        imagen: "assets/images/hamburguesa-pollo-crocante.jpg" }
    ]
  },
  {
    id: "broaster", nombre: "Broaster",
    nota: "Todo sale con papas fritas y cremas.",
    platos: [
      { id: "b1", nombre: "1/4 de pollo broaster", desc: "Pierna y encuentro con papas y ensalada.", precio: 14, etiquetas: ["Más pedido"],
        saciedad: "lleno", picante: false, personas: 1,
        imagen: "assets/images/broaster-cuarto-pollo.jpg" },
      { id: "b2", nombre: "Alitas broaster (8)", desc: "Ocho alitas doradas, cremas aparte.", precio: 16,
        saciedad: "normal", picante: false, personas: 2,
        imagen: "assets/images/broaster-alitas-8.jpg" },
      { id: "b3", nombre: "Chicharrón de pollo", desc: "Trozos apanados con papas y salsa de la casa.", precio: 15,
        saciedad: "normal", picante: false, personas: 1,
        imagen: "assets/images/chicharron-de-pollo.jpg" }
    ]
  },
  {
    id: "salchipapas", nombre: "Salchipapas", nota: "",
    platos: [
      { id: "s1", nombre: "Salchipapa clásica", desc: "Papas cortadas a mano y salchicha huachana.", precio: 9,
        saciedad: "liviano", picante: false, personas: 1,
        imagen: "assets/images/salchipapa-clasica.jpg" },
      { id: "s2", nombre: "Salchipapa especial", desc: "Con huevo frito, queso y cebolla china.", precio: 13,
        saciedad: "normal", picante: false, personas: 1,
        imagen: "assets/images/salchipapa-especial.jpg" },
      { id: "s3", nombre: "Mostrito", desc: "Chaufa, broaster y papas en un solo plato.", precio: 15, etiquetas: ["Rinde para dos"],
        saciedad: "lleno", picante: false, personas: 2,
        imagen: "assets/images/mostrito.jpg" }
    ]
  },
  {
    id: "combos", nombre: "Combos",
    nota: "Pensados para compartir. Se sirven en bandeja.",
    platos: [
      { id: "c1", nombre: "Combo personal", desc: "Clásica + papas medianas + gaseosa personal.", precio: 15,
        saciedad: "normal", picante: false, personas: 1,
        imagen: "assets/images/combo-personal.jpg" },
      { id: "c2", nombre: "Combo dúo", desc: "Dos Royal + papas grandes + dos gaseosas.", precio: 28, etiquetas: ["Ahorras S/ 4"],
        saciedad: "lleno", picante: false, personas: 2,
        imagen: "assets/images/combo-duo.jpg" },
      { id: "c3", nombre: "Combo familiar", desc: "Cuatro clásicas + papas familiares + gaseosa 1.5 L.", precio: 55,
        saciedad: "lleno", picante: false, personas: 4,
        imagen: "assets/images/combo-familiar.jpg" },
      { id: "c4", nombre: "Combo broaster", desc: "1/4 de broaster + salchipapa + chicha 1/2 L.", precio: 22,
        saciedad: "lleno", picante: false, personas: 2,
        imagen: "assets/images/combo-broaster.jpg" }
    ]
  },
  {
    id: "bebidas", nombre: "Bebidas", nota: "",
    platos: [
      { id: "d1", nombre: "Chicha morada 1/2 L", desc: "Hervida el mismo día.", precio: 4, personas: 1,
        imagen: "assets/images/chicha-morada-medio-litro.jpg" },
      { id: "d2", nombre: "Limonada frozen", desc: "Vaso grande.", precio: 6, personas: 1,
        imagen: "assets/images/limonada-frozen.jpg" },
      { id: "d3", nombre: "Gaseosa personal", desc: "Inca Kola, Coca Cola o Fanta.", precio: 4, personas: 1,
        imagen: "assets/images/gaseosa-personal.jpg" },
      { id: "d4", nombre: "Gaseosa 1.5 L", desc: "Para la mesa.", precio: 9, personas: 3,
        imagen: "assets/images/gaseosa-litro-y-medio.jpg" }
    ]
  }
];
