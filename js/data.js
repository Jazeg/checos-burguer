/* Carta de Checo’s Burger, transcrita de PLATOS.pdf.
   Ver MIGRACION.md para decisiones, datos pendientes y procedencia.
   Fotos de la carta de hamburguesas en assets/cena/; el resto usa el recurso tipográfico. */
const NEGOCIO = {
 nombre: "Checo’s Burger", bajada: "Desayunos & hamburguesas",
 direccion: "Dirección por confirmar", telefonoVisible: "947 788 574", whatsapp: "51947788574",
 delivery: { centro: "Por confirmar", otras: "Por confirmar", tiempo: "Tiempo por confirmar" }
};
const HERO = { imagen: "assets/cena/Hamburguesa de casa.webp", alt: "Hamburguesa de casa de Checo’s" };

const CARTA = [
  {
    "id": "hamburguesas",
    "nombre": "Hamburguesas",
    "tipo": "comida",
    "nota": "De casa, filete de pollo, pollo deshilachado, chorizo o crispy.",
    "platos": [
      {
        "id": "hamburguesas-1",
        "nombre": "Hamburguesa de casa",
        "precio": 8,
        "desc": "",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/cena/Hamburguesa de casa.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "hamburguesas-2",
        "nombre": "Hamburguesa de casa royal",
        "precio": 9,
        "desc": "",
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
        "desc": "",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-5",
        "nombre": "Hamburguesa de casa + tocino",
        "precio": 10,
        "desc": "",
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
        "desc": "",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "hamburguesas-4",
        "nombre": "Hamburguesa de casa doble",
        "precio": 11,
        "desc": "",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/cena/Hamburguesa de casa doble carne.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "hamburguesas-6",
        "nombre": "Cheeseburger",
        "precio": 11,
        "desc": "",
        "subgrupo": "Hamburguesa de casa",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-1",
        "nombre": "Filete de pollo",
        "precio": 8,
        "desc": "",
        "subgrupo": "Filete de pollo",
        "imagen": "assets/cena/Filete de pollo.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-2",
        "nombre": "Filete de pollo royal",
        "precio": 9,
        "desc": "",
        "subgrupo": "Filete de pollo",
        "imagen": "assets/cena/Filete de pollo Royal.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-4",
        "nombre": "Filete de pollo hawaiano",
        "precio": 9,
        "desc": "",
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
        "desc": "",
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
        "desc": "",
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
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-7",
        "nombre": "Pollo deshilachado royal",
        "precio": 9,
        "desc": "",
        "subgrupo": "Pollo deshilachado",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "sandwiches-8",
        "nombre": "Pollo deshilachado hawaiano",
        "precio": 9,
        "desc": "",
        "subgrupo": "Pollo deshilachado",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": true
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
        "desc": "",
        "subgrupo": "Chorizo",
        "imagen": "assets/cena/Hamburguesa con chorizo.webp",
        "fuente": "PLATOS.pdf · página 1",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "sandwiches-11",
        "nombre": "Chorizo royal",
        "precio": 9,
        "desc": "",
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
        "desc": "",
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
        "desc": "",
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
        "desc": "",
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
        "desc": "",
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
        "desc": "",
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
    "nombre": "Salchipapas",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "salchipapas-1",
        "nombre": "Salchipapa simple",
        "precio": 8,
        "desc": "",
        "imagen": "assets/cena/Salchipapa Simple.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-2",
        "nombre": "Salchipapa a lo pobre",
        "precio": 9.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-3",
        "nombre": "Salchipapa con filete de pollo",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/Salchipapa con filete de pollo.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-4",
        "nombre": "Salchipapa con chorizo",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/Salchipapa con Chorizo.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-5",
        "nombre": "Salchipapa con hamburguesa",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/Salchipapa con hamburguesa.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-6",
        "nombre": "Salchipapa con deshilachado",
        "precio": 11,
        "desc": "",
        "imagen": "assets/cena/Salchipapa con pollo deshilachado.webp",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": false
      },
      {
        "id": "salchipapas-7",
        "nombre": "Salchipapa especial",
        "precio": 14,
        "desc": "",
        "imagen": "assets/cena/Salchipapa Especial.webp",
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
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "salchipapas-11",
        "nombre": "Salchibroaster",
        "precio": 13,
        "desc": "Pecho, pierna o encuentro.",
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
    "nombre": "Club sándwiches",
    "tipo": "comida",
    "nota": "",
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
    "nombre": "Enchiladas con queso",
    "tipo": "comida",
    "nota": "",
    "platos": [
      {
        "id": "enchiladas-1",
        "nombre": "Enchilada de carne + 2 quesos",
        "precio": 11,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-2",
        "nombre": "Enchilada de pollo deshilachado + 2 quesos",
        "precio": 11,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-3",
        "nombre": "Enchilada de filete de pollo, huevo + 2 quesos",
        "precio": 11,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-4",
        "nombre": "Enchilada de deshilachado hawaiano + 2 quesos",
        "precio": 12,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-5",
        "nombre": "Enchilada de deshilachado cubano + 2 quesos",
        "precio": 12,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-6",
        "nombre": "Enchilada crispy",
        "precio": 13,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-7",
        "nombre": "Enchilada de carne y pollo + 2 quesos",
        "precio": 14,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-8",
        "nombre": "Enchilada de chorizo y carne + 2 quesos",
        "precio": 14,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-9",
        "nombre": "Enchilada mixta",
        "precio": 17,
        "desc": "Chorizo, pollo, jamón y 2 quesos.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 2",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "enchiladas-10",
        "nombre": "Enchilada monster",
        "precio": 23,
        "desc": "Carne, pollo, chorizo, jamón, queso, tocino y huevo.",
        "imagen": "assets/comun/carta-checos.svg",
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
        "nombre": "Alitas simple",
        "precio": 14,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "alitas-2",
        "nombre": "Alitas picantes",
        "precio": 15,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "alitas-3",
        "nombre": "Alitas a la cerveza",
        "precio": 15,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "alitas-4",
        "nombre": "Alitas mixtas",
        "precio": 16,
        "desc": "Picante y cerveza.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "comida",
        "imagenReferencial": true
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
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-2",
        "nombre": "Piña",
        "precio": 6,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-3",
        "nombre": "Surtido",
        "precio": 6,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-4",
        "nombre": "Fresa",
        "precio": 6.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-5",
        "nombre": "Papaya con fresa",
        "precio": 6,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-6",
        "nombre": "Mango",
        "precio": 6,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-7",
        "nombre": "Papaya con piña",
        "precio": 6,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
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
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-2",
        "nombre": "Fresa con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-3",
        "nombre": "Lúcuma con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-4",
        "nombre": "Mango con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-5",
        "nombre": "Plátano con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-6",
        "nombre": "Lúcuma, mango y leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-7",
        "nombre": "Papaya, fresa y leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-8",
        "nombre": "Piña con leche",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-9",
        "nombre": "Especial",
        "precio": 8,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-10",
        "nombre": "Plátano, leche y avena",
        "precio": 9,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-11",
        "nombre": "Guayaba con leche",
        "precio": 8,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 3",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "jugos-leche-12",
        "nombre": "Piña con berenjena",
        "precio": 6.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
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
        "nombre": "Chicha morada vaso",
        "precio": 2,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-2",
        "nombre": "Chicha morada medio litro",
        "precio": 4.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-3",
        "nombre": "Chicha morada litro",
        "precio": 9,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-4",
        "nombre": "Gaseosa personal",
        "precio": 2,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-5",
        "nombre": "Gaseosa medio litro",
        "precio": 4,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-6",
        "nombre": "Gordita",
        "precio": 5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-7",
        "nombre": "Gaseosa litro",
        "precio": 7,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-8",
        "nombre": "Gaseosa litro y medio",
        "precio": 10,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-9",
        "nombre": "Agua medio litro",
        "precio": 2,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-10",
        "nombre": "Limonada frozen litro",
        "precio": 10,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
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
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-calientes-2",
        "nombre": "Café con leche",
        "precio": 3.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 4",
        "tipo": "bebida",
        "imagenReferencial": true
      },
      {
        "id": "bebidas-calientes-3",
        "nombre": "Té, anís, manzanilla",
        "precio": 2.5,
        "desc": "",
        "imagen": "assets/comun/carta-checos.svg",
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
        "precio": 1.5,
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
        "precio": 2.5,
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
        "nombre": "Pecho, pierna o encuentro",
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
        "nombre": "Hamburguesa, filete, chorizo o deshilachado",
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
    "nombre": "Combos",
    "tipo": "comida",
    "nota": "Todos incluyen gaseosa.",
    "platos": [
      {
        "id": "combos-1",
        "nombre": "Combo 1",
        "precio": 13.5,
        "desc": "1 hamburguesa de casa + 2 quesos + 1 huevo + ensalada + gaseosa.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-2",
        "nombre": "Combo 2",
        "precio": 13.5,
        "desc": "1 filete + jamón + queso + huevo + ensalada + gaseosa.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-3",
        "nombre": "Combo 3",
        "precio": 14.5,
        "desc": "1 hamburguesa de casa + hot dog + queso + huevo + ensalada + gaseosa.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-5",
        "nombre": "Combo 5",
        "precio": 15.5,
        "desc": "Choripollo + jamón + queso + tocino + ensalada + gaseosa.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-6",
        "nombre": "Combo 6",
        "precio": 15.5,
        "desc": "Hamburguesa de casa + 1 filete + jamón + ensalada + gaseosa.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-7",
        "nombre": "Combo 7",
        "precio": 15.5,
        "desc": "1 hamburguesa de casa + 2 piñas + queso + 1 huevo + ensalada + gaseosa.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-8",
        "nombre": "Combo 8",
        "precio": 15.5,
        "desc": "1 filete + hot dog + queso + tocino + huevo + ensalada + gaseosa.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-11",
        "nombre": "Combo 11",
        "precio": 15,
        "desc": "2 hamburguesas de casa + 2 quesos + huevo + ensalada + gaseosa.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
      },
      {
        "id": "combos-12",
        "nombre": "Combo 12",
        "precio": 15,
        "desc": "Hamburguesa de casa + deshilachado + queso + huevo + jamón + ensalada + gaseosa.",
        "imagen": "assets/comun/carta-checos.svg",
        "fuente": "PLATOS.pdf · página 5–6",
        "tipo": "comida",
        "imagenReferencial": true
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
    "imagen": "assets/comun/carta-checos.svg",
    "fuente": "PLATOS.pdf · página 5–6",
    "tipo": "comida",
    "imagenReferencial": true
  },
  {
    "id": "combos-9",
    "nombre": "Combo 9",
    "precio": 15.5,
    "desc": "Lectura provisional: 2 filetes + 2 quesos + 2 jamones + huevo + ensalada + gaseosa.",
    "imagen": "assets/comun/carta-checos.svg",
    "fuente": "PLATOS.pdf · página 5–6",
    "tipo": "comida",
    "imagenReferencial": true
  },
  {
    "id": "combos-10",
    "nombre": "Combo 10",
    "precio": 15,
    "desc": "Lectura provisional: 2 chorizos + 2 quesos + 1 huevo + ... + tocino + gaseosa.",
    "imagen": "assets/comun/carta-checos.svg",
    "fuente": "PLATOS.pdf · página 5–6",
    "tipo": "comida",
    "imagenReferencial": true
  },
  {
    "id": "combos-13",
    "nombre": "Combo 13",
    "precio": 18,
    "desc": "Lectura provisional: hamburguesa de casa + filete + chorizo + queso + tocino + ... + ensalada + huevo + gaseosa.",
    "imagen": "assets/comun/carta-checos.svg",
    "fuente": "PLATOS.pdf · página 5–6",
    "tipo": "comida",
    "imagenReferencial": true
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
      "imagen": "assets/desayuno/desayuno.svg",
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
      "imagen": "assets/desayuno/desayuno.svg",
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
      "imagen": "assets/desayuno/desayuno.svg",
      "fuente": "Demo · no figura en el PDF",
      "tipo": "comida",
      "imagenReferencial": true,
      "demo": true
    }
  ]
}, ...CARTA.filter(s => ['bebidas-calientes', 'jugos', 'jugos-leche'].includes(s.id))];

const CARTA_ALMUERZO = [{
  "id": "almuerzos",
  "nombre": "Almuerzos",
  "tipo": "comida",
  "nota": "Carta provisional: estos almuerzos no aparecen en el PDF. Productos y precios de ejemplo.",
  "platos": [
    {
      "id": "al1",
      "nombre": "Menú del día",
      "precio": 12,
      "desc": "Propuesta de ejemplo; pendiente de confirmar.",
      "imagen": "assets/comun/carta-checos.svg",
      "fuente": "Demo · no figura en el PDF",
      "tipo": "comida",
      "imagenReferencial": true,
      "demo": true
    },
    {
      "id": "al2",
      "nombre": "Plato a la carta",
      "precio": 15,
      "desc": "Propuesta de ejemplo; pendiente de confirmar.",
      "imagen": "assets/comun/carta-checos.svg",
      "fuente": "Demo · no figura en el PDF",
      "tipo": "comida",
      "imagenReferencial": true,
      "demo": true
    },
    {
      "id": "al3",
      "nombre": "Almuerzo de la casa",
      "precio": 18,
      "desc": "Propuesta de ejemplo; pendiente de confirmar.",
      "imagen": "assets/comun/carta-checos.svg",
      "fuente": "Demo · no figura en el PDF",
      "tipo": "comida",
      "imagenReferencial": true,
      "demo": true
    }
  ]
}, ...CARTA.filter(s => ['jugos', 'jugos-leche', 'bebidas'].includes(s.id))];
