/* Desayuno ejecutivo: se carga únicamente en el catálogo corporativo.
   En el desayuno todos los jugos van en dos tamaños (TAMANOS_JUGO_AM). Los
   de la noche se reutilizan con id propio (am-<id>) para que su precio de
   la mañana no se cruce con el de la noche; nombre y foto siguen saliendo
   de CARTA. */
const TAMANOS_JUGO_AM = [{ nombre: "Vaso 250 ml", precio: 3 }, { nombre: "Medio litro", precio: 6 }];
const FOTOS_BEBIDAS_AM = {
  "am-jugos-6": "assets/desayuno/productos/jugos-mango.jpg",
  "am-jugos-leche-8": "assets/desayuno/productos/jugos-leche-pina.jpg",
  "bebidas-calientes-2": "assets/desayuno/productos/cafe-leche.jpg"
};
const OPCIONES_HAMBURGUESA_AM = [
  { nombre: "Papas", valores: ["Papas fritas", "Papas al hilo"] },
  { nombre: "Acompañante", valores: ["Queso", "Jamón"] }
];
const platoAm = (id, nombre, precio, extra = {}) =>
  ({ id: "am-" + id, nombre, precio, desc: "", imagen: `assets/desayuno/productos/${id}.jpg`, tipo: "comida", imagenReferencial: true, ...extra });
const jugoAm = p => ({ ...p, id: "am-" + p.id, precio: TAMANOS_JUGO_AM[0].precio, tamanos: TAMANOS_JUGO_AM });
const seccionNoche = id => CARTA.find(s => s.id === id);
const NOTA_JUGOS_AM = "Vaso de 250 ml a S/ 3 o medio litro a S/ 6.";

const CARTA_DESAYUNO = [
  {
    id: "desayunos", nombre: "Desayunos", tipo: "comida", cremas: "desayuno", nota: "",
    platos: [
      platoAm("pan-huevo", "Pan con huevo", 3),
      platoAm("pan-palta", "Pan con palta", 3),
      platoAm("caldo-gallina", "Caldo de gallina", 12, { cremas: null })
    ]
  },
  {
    id: "sandwiches-am", nombre: "Sándwiches", tipo: "comida", cremas: "desayuno", nota: "",
    sugerencia: "am-jugos-naranja", acompanamientos: "jugos-am",
    platos: [
      platoAm("sandwich-deshilachado", "Sándwich de pollo deshilachado", 9),
      platoAm("sandwich-huevo-queso", "Sándwich de pollo con huevo y queso", 9),
      platoAm("sandwich-queso-tocino", "Sándwich de pollo, queso y tocino", 9),
      platoAm("pan-pollo", "Pan con pollo, lechuga y tomate", 8,
        { opciones: [{ nombre: "Agrega", valores: ["Huevo", "Queso", "Papas al hilo"] }] })
    ]
  },
  {
    id: "hamburguesas-am", nombre: "Hamburguesas", tipo: "comida", cremas: "desayuno",
    nota: "Más ligeras que las de la noche.",
    platos: [
      platoAm("hamburguesa-carne", "Hamburguesa de carne casera", 8, { opciones: OPCIONES_HAMBURGUESA_AM }),
      platoAm("hamburguesa-filete", "Hamburguesa de filete de pollo", 8, { opciones: OPCIONES_HAMBURGUESA_AM })
    ]
  },
  {
    id: "jugos-am", nombre: "Jugos", tipo: "bebida", nota: NOTA_JUGOS_AM,
    platos: [
      platoAm("jugos-naranja", "Naranja", TAMANOS_JUGO_AM[0].precio, { tipo: "bebida", tamanos: TAMANOS_JUGO_AM }),
      ...seccionNoche("jugos").platos.map(jugoAm)
    ]
  },
  { id: "jugos-leche-am", nombre: "Jugos con leche", tipo: "bebida", nota: NOTA_JUGOS_AM,
    platos: seccionNoche("jugos-leche").platos.map(jugoAm) },
  {
    ...seccionNoche("bebidas-calientes"),
    platos: [
      ...seccionNoche("bebidas-calientes").platos.slice(0, 2),
      platoAm("infusion-te", "Té", 2.5, { tipo: "bebida", desc: "Vaso de 250 ml." }),
      platoAm("infusion-anis", "Anís", 2.5, { tipo: "bebida", desc: "Vaso de 250 ml." }),
      platoAm("infusion-manzanilla", "Manzanilla", 2.5, { tipo: "bebida", desc: "Vaso de 250 ml." })
    ]
  }
];
