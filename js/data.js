/* Carta de Checo’s Burger, transcrita de PLATOS.pdf.
   Ver MIGRACION.md para decisiones, datos pendientes y procedencia.
   Fotos de la carta de hamburguesas en assets/cena/<id de sección>/; el resto usa el recurso tipográfico. */
const NEGOCIO = {
 nombre: "Checo’s Burger", bajada: "El poderoso sanguchón",
 direccion: "Jr. José Osores 180, Chota 06121", telefonoVisible: "936 538 325", whatsapp: "51936538325",
 /* Tarifas de referencia: no se suman al total, el vendedor confirma el
    costo final por WhatsApp. */
 delivery: {
  zonas: [{ nombre: "Zona céntrica", precio: "S/ 2.00" }, { nombre: "Zona más alejada", precio: "S/ 3.00" }],
  nota: "Otras zonas: se coordina por WhatsApp. El costo final del delivery te lo confirmamos en el chat."
 }
};
/* Cremas: el cliente elige todas las que quiera, aunque pida una sola
   unidad. La primera porción de cada crema es gratis; cada porción extra de
   esa misma crema suma CREMA_EXTRA por unidad, hasta MAX_PORCIONES_CREMA.
   Cada sección indica qué lista usa con su campo "cremas".
   "sugerencia" (id de un plato) se ofrece en la ficha con un clic y
   "acompanamientos" (id de una sección) es a dónde lleva "Ver todos los
   acompañamientos". Los combos no sugieren bebida: ya la incluyen. */
const CREMAS = {
  noche: ["Mayonesa", "Ketchup", "Mostaza", "Ají", "Salsa tártara", "Guacatay", "Salsa wolf", "Aceituna"],
  desayuno: ["Mostaza", "Ají"]
};
const CREMA_EXTRA = 0.2;
const MAX_PORCIONES_CREMA = 5;
/* Opciones obligatorias de la ficha: la sección las define con su campo
   "opciones" y un plato puede pisarlas. Club sándwiches no elige: van
   siempre con papas fritas. */
const OPCION_PAPAS = { nombre: "Papas", valores: ["Papas fritas", "Papas al hilo"] };
const OPCION_ENSALADA = { nombre: "Ensalada", valores: ["Con ensalada", "Sin ensalada"] };
/* La gaseosa personal de vidrio es solo para consumir en el local. En los
   pedidos (delivery o recojo) va pequeña de plástico, a elegir. La usan la
   Gaseosa personal y todos los combos. */
const OPCION_GASEOSA = { nombre: "Bebida", valores: ["Inca Kola", "Coca-Cola", "Del Valle"] };
const HERO = { imagen: "assets/cena/hamburguesas/Hamburguesa de casa.webp", alt: "Hamburguesa de casa de Checo’s" };

const CARTA = [
  {
    "id": "hamburguesas",
    "cremas": "noche",
    "opciones": [OPCION_PAPAS, OPCION_ENSALADA],
    "sugerencia": "bebidas-4",
    "acompanamientos": "bebidas",
    "nombre": "Hamburguesas",
    "tipo": "comida",
    "nota": "Todas incluyen papas fritas o al hilo, cremas y ensalada.",
    "platos": [
      {
        "id": "hamburguesas-1",
        "nombre": "Hamburguesa de casa",
        "precio": 8,
        "desc": "Carne y huevo.",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/cena/hamburguesas/Hamburguesa de casa.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "hamburguesas-2",
        "nombre": "Hamburguesa de casa royal",
        "precio": 9,
        "desc": "Carne, huevo y queso.",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-3",
        "nombre": "Hamburguesa de casa hawaiana",
        "precio": 9,
        "desc": "Carne, queso y piña.",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/cena/hamburguesas/Hambuguesa de casa hawaiana.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "hamburguesas-5",
        "nombre": "Hamburguesa de casa + tocino",
        "precio": 10,
        "desc": "Carne, huevo y tocino.",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-7",
        "nombre": "Hamburguesa royal + tocino",
        "precio": 11,
        "desc": "Carne, huevo, queso y tocino.",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/cena/hamburguesas/Hmaburgesa royal de casa con tocino.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "hamburguesas-4",
        "nombre": "Hamburguesa de casa doble",
        "precio": 11,
        "desc": "2 carnes y huevo.",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/cena/hamburguesas/Hamburguesa de casa doble carne.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "hamburguesas-6",
        "nombre": "Cheeseburger",
        "precio": 11,
        "desc": "Carne y 2 quesos.",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/cena/hamburguesas/Hmaburgesa chesse burger doble queso.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-1",
        "nombre": "Filete de pollo",
        "precio": 8,
        "desc": "Filete de pollo y huevo.",
        "subgrupo": "Filete de pollo",
        "imagen": "assets/cena/hamburguesas/Filete de pollo.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-2",
        "nombre": "Filete de pollo royal",
        "precio": 9,
        "desc": "Filete, huevo y queso.",
        "subgrupo": "Filete de pollo",
        "imagen": "assets/cena/hamburguesas/Hamburguesa filete de pollo royal.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-4",
        "nombre": "Filete de pollo hawaiano",
        "precio": 9,
        "desc": "Filete, queso y piña.",
        "subgrupo": "Filete de pollo",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-5",
        "nombre": "Filete de pollo a la cubana",
        "precio": 9,
        "desc": "Filete, huevo y plátano frito.",
        "subgrupo": "Filete de pollo",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-3",
        "nombre": "Filete de pollo con tocino",
        "precio": 10,
        "desc": "Filete, huevo y tocino.",
        "subgrupo": "Filete de pollo",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-6",
        "nombre": "Pollo deshilachado",
        "precio": 8,
        "desc": "",
        "subgrupo": "Pollo deshilachado",
        "imagen": "assets/cena/hamburguesas/Hamburguesa de pollo deshilachado.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-7",
        "nombre": "Pollo deshilachado royal",
        "precio": 9,
        "desc": "",
        "subgrupo": "Pollo deshilachado",
        "imagen": "assets/cena/hamburguesas/Hmaburguesa con pollo deshilachado.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-8",
        "nombre": "Pollo deshilachado hawaiano",
        "precio": 9,
        "desc": "",
        "subgrupo": "Pollo deshilachado",
        "imagen": "assets/cena/hamburguesas/Hamburguesa con pollo deshilachado hawaiano.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-9",
        "nombre": "Pollo deshilachado cubano",
        "precio": 9,
        "desc": "",
        "subgrupo": "Pollo deshilachado",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-10",
        "nombre": "Chorizo",
        "precio": 8,
        "desc": "Chorizo y huevo.",
        "subgrupo": "Chorizo",
        "imagen": "assets/cena/hamburguesas/Hamburguesa con chorizo.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-11",
        "nombre": "Chorizo royal",
        "precio": 9,
        "desc": "Chorizo, huevo y queso.",
        "subgrupo": "Chorizo",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-12",
        "nombre": "Chorizo hawaiano",
        "precio": 9,
        "desc": "Chorizo, queso y piña.",
        "subgrupo": "Chorizo",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-13",
        "nombre": "Chorizo a la cubana",
        "precio": 9,
        "desc": "Chorizo, huevo y plátano frito.",
        "subgrupo": "Chorizo",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-8",
        "nombre": "Hamburguesa de pollo crispy",
        "precio": 11,
        "desc": "Pollo crocante y huevo.",
        "subgrupo": "Pollo crispy",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-9",
        "nombre": "Hamburguesa crispy + tocino",
        "precio": 13,
        "desc": "Pollo crocante, huevo y tocino.",
        "subgrupo": "Pollo crispy",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-10",
        "nombre": "Hamburguesa crispy + queso cheddar",
        "precio": 13,
        "desc": "Pollo crocante, huevo y queso amarillo.",
        "subgrupo": "Pollo crispy",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "broaster",
    "cremas": "noche",
    "opciones": [OPCION_ENSALADA],
    "sugerencia": "bebidas-4",
    "acompanamientos": "bebidas",
    "nombre": "Broaster",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "broaster-1",
        "nombre": "Alita broaster",
        "precio": 8,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "broaster-2",
        "nombre": "Pierna broaster",
        "precio": 11,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "broaster-3",
        "nombre": "Pecho broaster",
        "precio": 11,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "broaster-4",
        "nombre": "Alita + hot dog",
        "precio": 10.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "salchipapas",
    "cremas": "noche",
    "opciones": [OPCION_ENSALADA],
    "sugerencia": "bebidas-4",
    "acompanamientos": "bebidas",
    "nombre": "Salchipapas",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "salchipapas-1",
        "nombre": "Salchipapa simple",
        "precio": 8,
        "desc": "",
        "imagen": "assets/cena/salchipapas/Salchipapa Simple.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-2",
        "nombre": "Salchipapa a lo pobre",
        "precio": 9.5,
        "desc": "",
        "imagen": "assets/cena/salchipapas/Salchipapa a lo pobre.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-3",
        "nombre": "Salchipapa con filete de pollo",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/salchipapas/Salchipapa con filete de pollo.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-4",
        "nombre": "Salchipapa con chorizo",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/salchipapas/Salchipapa con Chorizo.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-5",
        "nombre": "Salchipapa con hamburguesa",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/salchipapas/Salchipapa con hamburguesa.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-6",
        "nombre": "Salchipapa con deshilachado",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/salchipapas/Salchipapa con pollo deshilachado.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-7",
        "nombre": "Salchipapa especial",
        "precio": 14,
        "desc": "",
        "imagen": "assets/cena/salchipapas/Salchipapa Especial.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-8",
        "nombre": "Súper salchipapa monster",
        "precio": 21,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-9",
        "nombre": "Salchibroaster alita",
        "precio": 10.5,
        "desc": "",
        "imagen": "assets/cena/salchipapas/Salchipapa con alita.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-11",
        "nombre": "Salchibroaster pecho",
        "precio": 13,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-12",
        "nombre": "Salchibroaster pierna",
        "precio": 13,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-13",
        "nombre": "Salchibroaster encuentro",
        "precio": 13,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-10",
        "nombre": "Filete con papas fritas",
        "precio": 9,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "club-sandwiches",
    "cremas": "noche",
    "sugerencia": "bebidas-4",
    "acompanamientos": "bebidas",
    "nombre": "Club sándwiches",
    "tipo": "comida",
    "nota": "Con papas fritas.",
    "platos": [
      {
        "id": "club-sandwiches-1",
        "nombre": "Sándwich básico",
        "precio": 11,
        "desc": "Queso, jamón, huevo y tocino.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "club-sandwiches-2",
        "nombre": "Sándwich súper",
        "precio": 13,
        "desc": "Huevo, pollo deshilachado, queso y jamón.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "club-sandwiches-3",
        "nombre": "Sándwich súper Checo’s",
        "precio": 15,
        "desc": "Chorizo, pollo deshilachado, queso y jamón.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "enchiladas",
    "cremas": "noche",
    "opciones": [OPCION_PAPAS, OPCION_ENSALADA],
    "sugerencia": "bebidas-4",
    "acompanamientos": "bebidas",
    "nombre": "Enchiladas con queso",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "enchiladas-1",
        "nombre": "Enchilada de carne + 2 quesos",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/enchiladas/Enchilada de Pollo carne.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "enchiladas-2",
        "nombre": "Enchilada de pollo deshilachado + 2 quesos",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/enchiladas/Enchilada de Pollo deshilachado.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "enchiladas-3",
        "nombre": "Enchilada de filete de pollo, huevo + 2 quesos",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/enchiladas/Enchilada de Pollo filete.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "enchiladas-4",
        "nombre": "Enchilada de deshilachado hawaiano + 2 quesos",
        "precio": 12,
        "desc": "",
        "imagen": "assets/cena/enchiladas/Enchilada de Pollo deshilachado hawaiano.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "enchiladas-5",
        "nombre": "Enchilada de deshilachado cubano + 2 quesos",
        "precio": 12,
        "desc": "",
        "imagen": "assets/cena/enchiladas/Enchilada de Pollo deshilachado cubano.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "enchiladas-6",
        "nombre": "Enchilada crispy",
        "precio": 13,
        "desc": "",
        "imagen": "assets/cena/enchiladas/Enchilada de Pollo crispy.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "enchiladas-7",
        "nombre": "Enchilada de carne y pollo + 2 quesos",
        "precio": 14,
        "desc": "",
        "imagen": "assets/cena/enchiladas/Enchilada de Carne y Pollo.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "enchiladas-8",
        "nombre": "Enchilada de chorizo y carne + 2 quesos",
        "precio": 14,
        "desc": "",
        "imagen": "assets/cena/enchiladas/Enchilada de Chorizo y Carne.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "enchiladas-9",
        "nombre": "Enchilada mixta",
        "precio": 17,
        "desc": "Chorizo, pollo, jamón y 2 quesos.",
        "imagen": "assets/cena/enchiladas/Enchilada Mixta.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "enchiladas-10",
        "nombre": "Enchilada monster",
        "precio": 23,
        "desc": "Carne, pollo, chorizo, jamón, queso, tocino y huevo.",
        "imagen": "assets/cena/enchiladas/Enchilada Monster.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      }
    ]
  },
  {
    "id": "alitas",
    "cremas": "noche",
    "sugerencia": "bebidas-4",
    "acompanamientos": "bebidas",
    "nombre": "Alitas BBQ",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "alitas-1",
        "nombre": "Alitas simple",
        "precio": 14,
        "desc": "",
        "imagen": "assets/cena/alitas/Alitas BBQ Simple.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "alitas-2",
        "nombre": "Alitas picantes",
        "precio": 15,
        "desc": "",
        "imagen": "assets/cena/alitas/Alitas BBQ Picante.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "alitas-3",
        "nombre": "Alitas a la cerveza",
        "precio": 15,
        "desc": "",
        "imagen": "assets/cena/alitas/Alitas BBQ Sabor a Cerveza.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "alitas-4",
        "nombre": "Alitas mixtas",
        "precio": 16,
        "desc": "Picante y cerveza.",
        "imagen": "assets/cena/alitas/Alitas BBQ Mixta.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": false
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
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos/Jugo de Papaya.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-2",
        "nombre": "Piña",
        "precio": 6,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos/Jugo de Piña.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-3",
        "nombre": "Surtido",
        "precio": 6,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos/Jugo Surtido.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-4",
        "nombre": "Fresa",
        "precio": 6.5,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos/Jugo de Fresa.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-5",
        "nombre": "Papaya con fresa",
        "precio": 6,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos/Jugo de Papaya con Fresa.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-6",
        "nombre": "Mango",
        "precio": 6,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-7",
        "nombre": "Papaya con piña",
        "precio": 6,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos/Jugo de Papaya con Piña.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      }
    ]
  },
  {
    "id": "jugos-leche",
    "nombre": "Jugos con leche",
    "tipo": "bebida",
    "nota": "",
    "platos": [
      {
        "id": "jugos-leche-1",
        "nombre": "Papaya con leche",
        "precio": 7,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Papaya con Leche.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-2",
        "nombre": "Fresa con leche",
        "precio": 7,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Fresa con Leche.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-3",
        "nombre": "Lúcuma con leche",
        "precio": 7,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Lúcuma con Leche.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-4",
        "nombre": "Mango con leche",
        "precio": 7,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Mango con Leche.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-5",
        "nombre": "Plátano con leche",
        "precio": 7,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Plátano con Leche.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-6",
        "nombre": "Lúcuma, mango y leche",
        "precio": 7,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Lúcuma, Mango y Leche.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-7",
        "nombre": "Papaya, fresa y leche",
        "precio": 7,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Papaya, Fresa y Leche.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-8",
        "nombre": "Piña con leche",
        "precio": 7,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-9",
        "nombre": "Especial",
        "precio": 8,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Especial.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-10",
        "nombre": "Plátano, leche y avena",
        "precio": 9,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Plátano, Avena y Leche.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-11",
        "nombre": "Guayaba con leche",
        "precio": 8,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Guayaba con Leche.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "jugos-leche-12",
        "nombre": "Piña con berenjena",
        "precio": 6.5,
        "desc": "Medio litro (500 ml).",
        "imagen": "assets/comun/jugos-leche/Jugo de Piña con Berenjena Roja.webp",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": false
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
        "nombre": "Chicha morada vaso",
        "precio": 2,
        "desc": "",
        "imagen": "assets/comun/bebidas/Chicha Morada.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-2",
        "nombre": "Chicha morada medio litro",
        "precio": 4.5,
        "desc": "",
        "imagen": "assets/comun/bebidas/Chicha Morada Medio Litro.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-3",
        "nombre": "Chicha morada litro",
        "precio": 9,
        "desc": "",
        "imagen": "assets/comun/bebidas/Chicha Morada Un Litro.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-4",
        "nombre": "Gaseosa personal",
        "precio": 2,
        "desc": "Para pedidos va en botella pequeña de plástico: Inca Kola, Coca-Cola o Del Valle. La de vidrio es solo para consumir en el local.",
        "opciones": [OPCION_GASEOSA],
        "imagen": "assets/comun/bebidas/Inka Kola Personal de Vidrio.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-5",
        "nombre": "Gaseosa medio litro",
        "precio": 4,
        "desc": "",
        "imagen": "assets/comun/bebidas/Inka Kola Medio Litro.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-6",
        "nombre": "Gordita",
        "precio": 5,
        "desc": "",
        "imagen": "assets/comun/bebidas/Inka Kola Gordita.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-7",
        "nombre": "Gaseosa litro",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/bebidas/Inka Kola 1 Litro.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-8",
        "nombre": "Gaseosa litro y medio",
        "precio": 10,
        "desc": "",
        "imagen": "assets/comun/bebidas/Inka Kola 1 Litro y Medio.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-9",
        "nombre": "Agua medio litro",
        "precio": 2,
        "desc": "",
        "imagen": "assets/comun/bebidas/Agua San Luis Medio Litro.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-10",
        "nombre": "Limonada frozen litro",
        "precio": 10,
        "desc": "",
        "imagen": "assets/comun/bebidas/Limonada Frozen Jarra 1 Litro.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
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
        "desc": "Vaso de medio litro.",
        "imagen": "assets/comun/bebidas-calientes/Café Caliente.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-calientes-2",
        "nombre": "Café con leche",
        "precio": 3.5,
        "desc": "",
        "imagen": "assets/comun/bebidas-calientes/cafe-leche.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-calientes-3",
        "nombre": "Té",
        "precio": 2.5,
        "desc": "Vaso de 250 ml.",
        "imagen": "assets/comun/bebidas-calientes/infusion-te.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-calientes-4",
        "nombre": "Anís",
        "precio": 2.5,
        "desc": "Vaso de 250 ml.",
        "imagen": "assets/comun/bebidas-calientes/infusion-anis.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
      },
      {
        "id": "bebidas-calientes-5",
        "nombre": "Manzanilla",
        "precio": 2.5,
        "desc": "Vaso de 250 ml.",
        "imagen": "assets/comun/bebidas-calientes/infusion-manzanilla.webp",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": false
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
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-2",
        "nombre": "Huevo",
        "precio": 1.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-3",
        "nombre": "Queso",
        "precio": 1.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-4",
        "nombre": "Queso cheddar",
        "precio": 2,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-5",
        "nombre": "Jamón",
        "precio": 1.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-6",
        "nombre": "Tocino",
        "precio": 2,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-7",
        "nombre": "Porción de hot dog",
        "precio": 3,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-8",
        "nombre": "Pecho",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-11",
        "nombre": "Pierna",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-12",
        "nombre": "Encuentro",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-9",
        "nombre": "Porción de papas",
        "precio": 5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-10",
        "nombre": "Hamburguesa",
        "precio": 4,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-13",
        "nombre": "Filete",
        "precio": 4,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-14",
        "nombre": "Chorizo",
        "precio": 4,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      },
      {
        "id": "extras-15",
        "nombre": "Deshilachado",
        "precio": 4,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "extra",
        "imagenReferencial": true
      }
    ]
  },
  {
    "id": "combos",
    "cremas": "noche",
    "opciones": [OPCION_GASEOSA],
    "nombre": "Combos",
    "tipo": "comida",
    "nota": "Todos incluyen bebida pequeña de plástico: Inca Kola, Coca-Cola o Del Valle.",
    "platos": [
      {
        "id": "combos-1",
        "nombre": "Combo 1",
        "precio": 13.5,
        "desc": "1 hamburguesa de casa + 2 quesos + 1 huevo + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 01 Especial de queso.webp",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "combos-2",
        "nombre": "Combo 2",
        "precio": 13.5,
        "desc": "1 filete + jamón + queso + huevo + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 02 Especial de pollo.webp",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "combos-3",
        "nombre": "Combo 3",
        "precio": 14.5,
        "desc": "1 hamburguesa de casa + hot dog + queso + huevo + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 03 Especial de hotdog.webp",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "combos-5",
        "nombre": "Combo 5",
        "precio": 15.5,
        "desc": "Choripollo + jamón + queso + tocino + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 05 Jamon y tocino.webp",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "combos-6",
        "nombre": "Combo 6",
        "precio": 15.5,
        "desc": "Hamburguesa de casa + 1 filete + jamón + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 06 Super combinado.webp",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "combos-7",
        "nombre": "Combo 7",
        "precio": 15.5,
        "desc": "1 hamburguesa de casa + 2 piñas + queso + 1 huevo + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 07 Especial hawaiana.webp",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "combos-8",
        "nombre": "Combo 8",
        "precio": 15.5,
        "desc": "1 filete + hot dog + queso + tocino + huevo + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 08 Especial pollo y hotdog.webp",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "combos-11",
        "nombre": "Combo 11",
        "precio": 15,
        "desc": "2 hamburguesas de casa + 2 quesos + huevo + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 11 Doble carne.webp",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "combos-12",
        "nombre": "Combo 12",
        "precio": 15,
        "desc": "Hamburguesa de casa + deshilachado + queso + huevo + jamón + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 12 Especial de pollo.webp",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "combos-13",
        "nombre": "Combo 13",
        "precio": 18,
        "desc": "Filete + chorizo + carne + huevo + queso + jamón + tocino + cremas + papas al hilo + ensalada + gaseosa.",
        "imagen": "assets/cena/combos/Combo 13 Especial combinado.webp",
        "fuente": "Cliente, 17/10/2026",
        "tipo": "comida",
        "imagenReferencial": false
      }
    ]
  }
];

/* Combos [PENDIENTE]: esperan confirmación del cliente. No se publican
   (no entran en CARTA ni en PLATOS) hasta que se resuelvan. */
const COMBOS_PENDIENTES = [
  {
    "id": "combos-4",
    "nombre": "Combo 4",
    "precio": 15.5,
    "desc": "Lectura provisional: pollo deshilachado + 2 quesos + 1 jamón + 1 huevo + ensalada + gaseosa.",
    "imagen": "assets/cena/combos/Combo 04 Super deshilachado.webp",
    "fuente": "PLATOS.pdf · página 5–6",
    "tipo": "comida",
    "imagenReferencial": false
  },
  {
    "id": "combos-9",
    "nombre": "Combo 9",
    "precio": 15.5,
    "desc": "Lectura provisional: 2 filetes + 2 quesos + 2 jamones + huevo + ensalada + gaseosa.",
    "imagen": "assets/cena/combos/Combo 09 Especial doble.webp",
    "fuente": "PLATOS.pdf · página 5–6",
    "tipo": "comida",
    "imagenReferencial": false
  },
  {
    "id": "combos-10",
    "nombre": "Combo 10",
    "precio": 15,
    "desc": "Lectura provisional: 2 chorizos + 2 quesos + 1 huevo + ... + tocino + gaseosa.",
    "imagen": "assets/cena/combos/Combo 10 Especial de chorizo.webp",
    "fuente": "PLATOS.pdf · página 5–6",
    "tipo": "comida",
    "imagenReferencial": false
  }
];
