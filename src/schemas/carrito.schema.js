import { z } from 'zod';

const createCarritoSchema = z.object({
  sesionID: z
    .string({
      required_error: "El ID de sesión es obligatorio.",
    })
    .min(1, "El ID de sesión no puede estar vacío."),

  productoId: z
    .string({
      required_error: "El codigo del producto es obligatorio.",
    })
    .min(1, "Debe seleccionar un producto válido."),

  cantidad: z
    .coerce
    .number({
      required_error: "La cantidad es obligatoria.",
    })
    .int("La cantidad debe ser un número entero.")
    .min(1, "La cantidad mínima debe ser 1."),
});

const updateCarritoSchema = z.object({
    cantidad: z.int().optional()
});

export const CarritoSchema = {
    create: createCarritoSchema,
    update: updateCarritoSchema
};