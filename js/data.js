/* Carta de Checo’s Burger, transcrita de PLATOS.pdf.
   Ver MIGRACION.md para decisiones, datos pendientes y procedencia.
   Las imágenes de la demo son referenciales. */
const NEGOCIO = {
 nombre: "Checo’s Burger", bajada: "Desayunos & hamburguesas",
 direccion: "Dirección por confirmar", telefonoVisible: "947 788 574", whatsapp: "51947788574",
 delivery: { centro: "Por confirmar", otras: "Por confirmar", tiempo: "Tiempo por confirmar" }
};
const HERO = { imagen: "assets/images/hero-burger-co.jpg", alt: "Hamburguesa de referencia para la carta de Checo’s" };

const CARTA = [
  {
    "id": "hamburguesas",
    "nombre": "Hamburguesas",
    "tipo": "comida",
    "nota": "De casa, royal, doble o crispy. Elige tu favorita.",
    "platos": [
      {
        "id": "hamburguesas-1",
        "nombre": "Hamburguesa de casa",
        "precio": 8,
        "desc": "",
        "imagen": "assets/images/hamburguesa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-2",
        "nombre": "Hamburguesa de casa royal",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/hamburguesa-royal-con-queso.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-3",
        "nombre": "Hamburguesa de casa hawaiana",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/hamburguesa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-4",
        "nombre": "Hamburguesa de casa doble",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/hamburguesa-doble-carne.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-5",
        "nombre": "Hamburguesa de casa con tocino",
        "precio": 10,
        "desc": "",
        "imagen": "assets/images/hamburguesa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-6",
        "nombre": "Cheeseburger",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/hamburguesa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-7",
        "nombre": "Hamburguesa royal con tocino",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/hamburguesa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-8",
        "nombre": "Hamburguesa de pollo crispy",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/hamburguesa-pollo-crocante.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-9",
        "nombre": "Hamburguesa crispy con tocino",
        "precio": 13,
        "desc": "",
        "imagen": "assets/images/hamburguesa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-10",
        "nombre": "Hamburguesa crispy con queso cheddar",
        "precio": 13,
        "desc": "",
        "imagen": "assets/images/hamburguesa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "sandwiches",
    "nombre": "Sándwiches",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "sandwiches-1",
        "nombre": "Filete de pollo",
        "precio": 8,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-2",
        "nombre": "Filete de pollo royal",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-3",
        "nombre": "Filete de pollo con tocino",
        "precio": 10,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-4",
        "nombre": "Filete de pollo hawaiano",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-5",
        "nombre": "Filete de pollo a la cubana",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-6",
        "nombre": "Pollo deshilachado",
        "precio": 8,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-7",
        "nombre": "Pollo deshilachado royal",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-8",
        "nombre": "Pollo deshilachado hawaiano",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-9",
        "nombre": "Pollo deshilachado cubano",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-10",
        "nombre": "Chorizo",
        "precio": 8,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-11",
        "nombre": "Chorizo royal",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-12",
        "nombre": "Chorizo hawaiano",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-13",
        "nombre": "Chorizo a la cubana",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "broaster",
    "nombre": "Broaster",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "broaster-1",
        "nombre": "Alita broaster",
        "precio": 8,
        "desc": "",
        "imagen": "assets/images/broaster-cuarto-pollo.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "broaster-2",
        "nombre": "Pierna broaster",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/broaster-cuarto-pollo.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "broaster-3",
        "nombre": "Pecho broaster",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/broaster-cuarto-pollo.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "broaster-4",
        "nombre": "Alita con hot dog",
        "precio": 10.5,
        "desc": "",
        "imagen": "assets/images/broaster-cuarto-pollo.jpg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "salchipapas",
    "nombre": "Salchipapas",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "salchipapas-1",
        "nombre": "Salchipapa simple",
        "precio": 8,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-2",
        "nombre": "Salchipapa a lo pobre",
        "precio": 9.5,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-3",
        "nombre": "Salchipapa con filete de pollo",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-4",
        "nombre": "Salchipapa con chorizo",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-5",
        "nombre": "Salchipapa con hamburguesa",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-6",
        "nombre": "Salchipapa con deshilachado",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-7",
        "nombre": "Salchipapa especial",
        "precio": 14,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-8",
        "nombre": "Súper salchipapa monster",
        "precio": 21,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-9",
        "nombre": "Salchibroaster alita",
        "precio": 10.5,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-10",
        "nombre": "Filete con papas fritas",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-11",
        "nombre": "Salchibroaster",
        "precio": 13,
        "desc": "Pecho, pierna o encuentro.",
        "imagen": "assets/images/salchipapa-clasica.jpg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "club-sandwiches",
    "nombre": "Club sándwiches",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "club-sandwiches-1",
        "nombre": "Club sándwich básico",
        "precio": 11,
        "desc": "Queso, jamón, huevo y tocino.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "club-sandwiches-2",
        "nombre": "Club sándwich súper",
        "precio": 13,
        "desc": "Huevo, pollo deshilachado, queso y jamón.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "club-sandwiches-3",
        "nombre": "Club sándwich súper Checo’s",
        "precio": 15,
        "desc": "Chorizo, pollo deshilachado, queso y jamón.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "enchiladas",
    "nombre": "Enchiladas con queso",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "enchiladas-1",
        "nombre": "Enchilada de carne + 2 quesos",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-2",
        "nombre": "Pollo deshilachado + 2 quesos",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-3",
        "nombre": "Filete de pollo, huevo + 2 quesos",
        "precio": 11,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-4",
        "nombre": "Deshilachado hawaiano + 2 quesos",
        "precio": 12,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-5",
        "nombre": "Deshilachado cubano + 2 quesos",
        "precio": 12,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-6",
        "nombre": "Enchilada crispy",
        "precio": 13,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-7",
        "nombre": "Enchilada de carne y pollo + 2 quesos",
        "precio": 14,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-8",
        "nombre": "Enchilada de chorizo y carne + 2 quesos",
        "precio": 14,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-9",
        "nombre": "Enchilada mixta",
        "precio": 17,
        "desc": "Chorizo, pollo, jamón y 2 quesos.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-10",
        "nombre": "Enchilada monster",
        "precio": 23,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "alitas",
    "nombre": "Alitas BBQ",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "alitas-1",
        "nombre": "Alitas simples",
        "precio": 14,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "alitas-2",
        "nombre": "Alitas picantes",
        "precio": 15,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "alitas-3",
        "nombre": "Alitas a la cerveza",
        "precio": 15,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "alitas-4",
        "nombre": "Alitas mixtas: picante y cerveza",
        "precio": 16,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "combos",
    "nombre": "Combos",
    "tipo": "comida",
    "nota": "La numeración y los precios corresponden a la carta del local.",
    "platos": [
      {
        "id": "combos-1",
        "nombre": "Combo #1",
        "precio": 13.5,
        "desc": "Hamburguesa de casa, 2 quesos, huevo, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-2",
        "nombre": "Combo #2",
        "precio": 13.5,
        "desc": "Filete, jamón, queso, ensalada, huevo y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-3",
        "nombre": "Combo #3",
        "precio": 14.5,
        "desc": "Hamburguesa de casa, hot dog, queso, huevo, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-4",
        "nombre": "Combo #4",
        "precio": 15.5,
        "desc": "Pollo deshilachado, queso, jamón, huevo, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-5",
        "nombre": "Combo #5",
        "precio": 15.5,
        "desc": "Choripollo, jamón, queso, tocino, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-6",
        "nombre": "Combo #6",
        "precio": 15.5,
        "desc": "Hamburguesa de casa, filete, jamón, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-7",
        "nombre": "Combo #7",
        "precio": 15.5,
        "desc": "Hamburguesa de casa, piña, queso, huevo, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-8",
        "nombre": "Combo #8",
        "precio": 15.5,
        "desc": "Filete, hot dog, queso, tocino, huevo, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-9",
        "nombre": "Combo #9",
        "precio": 15.5,
        "desc": "Filetes, quesos, jamón, huevo, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-10",
        "nombre": "Combo #10",
        "precio": 15,
        "desc": "Ingredientes por confirmar con Checo’s.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true,
        "pendienteIngredientes": true
      },
      {
        "id": "combos-11",
        "nombre": "Combo #11",
        "precio": 15,
        "desc": "2 hamburguesas de casa, 2 quesos, huevo, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-12",
        "nombre": "Combo #12",
        "precio": 15,
        "desc": "Hamburguesa de casa, deshilachado, queso, huevo, ensalada y gaseosa.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-13",
        "nombre": "Combo #13",
        "precio": 18,
        "desc": "Ingredientes por confirmar con Checo’s.",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true,
        "pendienteIngredientes": true
      }
    ]
  },
  {
    "id": "jugos",
    "nombre": "Jugos",
    "tipo": "bebida",
    "nota": "",
    "platos": [
      {
        "id": "jugos-1",
        "nombre": "Papaya",
        "precio": 6,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-2",
        "nombre": "Piña",
        "precio": 6,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-3",
        "nombre": "Surtido",
        "precio": 6,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-4",
        "nombre": "Fresa",
        "precio": 6.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-5",
        "nombre": "Papaya con fresa",
        "precio": 6,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-6",
        "nombre": "Mango",
        "precio": 6,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-7",
        "nombre": "Papaya con piña",
        "precio": 6,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "jugos-leche",
    "nombre": "Jugos con leche",
    "tipo": "bebida",
    "nota": "Opciones transcritas de la sección del PDF; consulta la preparación al pedir.",
    "platos": [
      {
        "id": "jugos-leche-1",
        "nombre": "Papaya con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-2",
        "nombre": "Fresa con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-3",
        "nombre": "Lúcuma con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-4",
        "nombre": "Mango con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-5",
        "nombre": "Plátano con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-6",
        "nombre": "Lúcuma, mango y leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-7",
        "nombre": "Papaya, fresa y leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-8",
        "nombre": "Piña con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-9",
        "nombre": "Especial",
        "precio": 8,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-10",
        "nombre": "Plátano, leche y avena",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-11",
        "nombre": "Guayaba con leche",
        "precio": 8,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-12",
        "nombre": "Piña con berenjena",
        "precio": 6.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "bebidas",
    "nombre": "Bebidas frías",
    "tipo": "bebida",
    "nota": "",
    "platos": [
      {
        "id": "bebidas-1",
        "nombre": "Chicha morada · vaso",
        "precio": 2,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-2",
        "nombre": "Chicha morada · medio litro",
        "precio": 4.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-3",
        "nombre": "Chicha morada · litro",
        "precio": 9,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-4",
        "nombre": "Gaseosa personal",
        "precio": 2,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-5",
        "nombre": "Gaseosa · medio litro",
        "precio": 4,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-6",
        "nombre": "Gordita",
        "precio": 5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-7",
        "nombre": "Gaseosa · litro",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-8",
        "nombre": "Gaseosa · litro y medio",
        "precio": 10,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-9",
        "nombre": "Agua · medio litro",
        "precio": 2,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-10",
        "nombre": "Limonada frozen · litro",
        "precio": 10,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "bebidas-calientes",
    "nombre": "Bebidas calientes",
    "tipo": "bebida",
    "nota": "",
    "platos": [
      {
        "id": "bebidas-calientes-1",
        "nombre": "Café",
        "precio": 3,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-calientes-2",
        "nombre": "Café con leche",
        "precio": 3.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-calientes-3",
        "nombre": "Té, anís o manzanilla",
        "precio": 2.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "extras",
    "nombre": "Extras",
    "tipo": "extra",
    "nota": "Complementa tu pedido. Indica la opción elegida en el chat.",
    "platos": [
      {
        "id": "extras-1",
        "nombre": "Táper",
        "precio": 1,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-2",
        "nombre": "Huevo",
        "precio": 1.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-3",
        "nombre": "Queso",
        "precio": 1.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-4",
        "nombre": "Queso cheddar",
        "precio": 1.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-5",
        "nombre": "Jamón",
        "precio": 1.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-6",
        "nombre": "Tocino",
        "precio": 2.5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-7",
        "nombre": "Porción de hot dog",
        "precio": 3,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-8",
        "nombre": "Pecho, pierna o encuentro",
        "precio": 7,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-9",
        "nombre": "Porción de papas",
        "precio": 5,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-10",
        "nombre": "Hamburguesa, filete, chorizo o deshilachado",
        "precio": 4,
        "desc": "",
        "imagen": "assets/images/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      }
    ]
  }
];
const CARTA_DESAYUNO = [{
  "id": "desayunos",
  "nombre": "Desayunos",
  "tipo": "comida",
  "nota": "Carta provisional: estos desayunos no aparecen en el PDF. Productos y precios de ejemplo.",
  "platos": [
    {
      "id": "am1",
      "nombre": "Pan con huevo",
      "precio": 6,
      "desc": "Propuesta de ejemplo; pendiente de confirmar.",
      "imagen": "assets/images/desayuno.svg",
      "fuente": "Demo · no figura en el PDF",
      "tipo": "comida",
      "imagenReferencial": true,
      "demo": true
    },
    {
      "id": "am2",
      "nombre": "Pan con palta",
      "precio": 7,
      "desc": "Propuesta de ejemplo; pendiente de confirmar.",
      "imagen": "assets/images/desayuno.svg",
      "fuente": "Demo · no figura en el PDF",
      "tipo": "comida",
      "imagenReferencial": true,
      "demo": true
    },
    {
      "id": "am3",
      "nombre": "Desayuno de la casa",
      "precio": 13,
      "desc": "Propuesta de ejemplo; pendiente de confirmar.",
      "imagen": "assets/images/desayuno.svg",
      "fuente": "Demo · no figura en el PDF",
      "tipo": "comida",
      "imagenReferencial": true,
      "demo": true
    }
  ]
}, ...CARTA.filter(s => ['bebidas-calientes', 'jugos', 'jugos-leche'].includes(s.id))];
