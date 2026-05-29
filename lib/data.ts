export type Sabor = {
  slug: string;
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
  color: string;
  precio: number;
  imagen: string;
  imagenPreparacion?: string;
};

export const SABORES: Sabor[] = [
  {
    slug: "clasico",
    nombre: "Clásico",
    descripcion: "El equilibrio perfecto entre limón sutil y pisco.",
    descripcionLarga: "Nuestro sabor Clásico es la receta original de la familia. Elaborado con jugo de limón sutil recién exprimido, pisco doble destilado premium y el toque exacto de goma. Ideal para quienes buscan la experiencia tradicional del Pisco Sour peruano-chileno con un balance impecable entre acidez y dulzor.",
    color: "#128708",
    precio: 11490,
    imagen: "/Botella.png",
    imagenPreparacion: "/preparacion_clasico.jpg"
  },
  {
    slug: "maracuya",
    nombre: "Maracuyá",
    descripcion: "Tropical, fresco y ligeramente dulce.",
    descripcionLarga: "Una explosión tropical en cada sorbo. Combinamos la intensidad del maracuyá fresco con la base clásica de nuestro Pisco Sour para crear una experiencia exótica, vibrante y peligrosamente adictiva. Perfecto para tardes de verano y celebraciones especiales.",
    color: "#ee7203",
    precio: 11490,
    imagen: "/Botella_Maracuya.png",
    imagenPreparacion: "/preparacion_maracuya.jpg"
  },
  {
    slug: "sin-azucar",
    nombre: "Sin azúcar",
    descripcion: "Todo el sabor, sin azúcar añadida.",
    descripcionLarga: "Para quienes buscan cuidarse sin sacrificar el placer. Mantenemos el mismo sabor intenso y la misma calidad de ingredientes que nuestro sabor Clásico, pero endulzado con una mezcla especial de stevia y alulosa que no deja sabor residual.",
    color: "#76c3df",
    precio: 12490,
    imagen: "/Botella_SinAzucar.png",
    imagenPreparacion: "/preparacion_sin_azucar.png"
  },
];

export function getSaborBySlug(slug: string): Sabor | undefined {
  return SABORES.find((sabor) => sabor.slug === slug);
}
