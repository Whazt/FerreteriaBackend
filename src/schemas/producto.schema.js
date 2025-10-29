import { z } from 'zod';

const createProductoSchema = z.object({
 codProducto: z
    .string()
    .min(1, "El código del producto no puede estar vacío."),

  producto: z
    .string()
    .min(1, "El nombre del producto no puede estar vacío."),

  descripcion: z
    .string()
    .min(1, "La descripción no puede estar vacía."),

  precio: z
    .coerce
    .number({
      required_error: "El precio es obligatorio.",
    })
    .decimal()
    .min(0.01, "El precio debe ser mayor o igual a 0.01."),

  existencias: z
    .coerce
    .number({
      required_error: "Las existencias son obligatorias.",
    })
    .integer("Las existencias deben ser un número entero.")
    .min(0, "Las existencias no pueden ser negativas."),

  categoriaId: z
    .coerce
    .number({
      required_error: "La categoría es obligatoria.",
    })
    .integer("El ID de categoría debe ser un número entero.")
    .min(1, "Debe seleccionar una categoría válida."),

  costo: z
    .coerce
    .number({
      required_error: "El costo es obligatorio.",
    })
    .decimal("El costo debe ser un número.")
    .min(1, "El costo debe ser mayor o igual a 1."),

    existenciaMax: z
    .coerce
    .number({
      required_error: "La existencia máxima es obligatoria.",
    })
    .integer("La existencia máxima debe ser un número entero.")
    .min(0, "La existencia máxima no puede ser negativa.")
    .default(0),

  existenciaMin: z
    .coerce
    .number({
      required_error: "La existencia mínima es obligatoria.",
    })
    .integer("La existencia mínima debe ser un número entero.")
    .min(0, "La existencia mínima no puede ser negativa.")
    .default(0),
});

const updateProductoSchema = z.object({
    producto: z.string().min(1).optional(),
    descripcion: z.string().min(1).optional(),
    precio: z.decimal().min(0.01).optional(),
    existencias: z.integer().min(0).optional(),
    categoriaId: z.integer().min(1).optional(),
    costo: z.decimal().min(1).optional(),
    existenciaMax: z.integer().min(0).optional(),
    existenciaMin: z.integer().min(0).optional(),
});

export const ProductoSchema = {
    create: createProductoSchema,
    update: updateProductoSchema
};