import { z } from 'zod';

const createAjusteSchema = z.object({
    productoId: z
    .coerce
    .number({
      required_error: "El producto es obligatorio.",
    })
    .int("El ID del producto debe ser un número entero.")
    .min(1, "Debe seleccionar un producto existente."),

    tipoAjusteId: z
    .coerce
    .number({
      required_error: "El tipo de ajuste es obligatorio.",
    })
    .int("El ID del tipo de ajuste debe ser un número entero.")
    .min(1, "Debe seleccionar un tipo de ajuste existente."),

    cantidad: z
    .coerce
    .number({
      required_error: "La cantidad es obligatoria.",
    })
    .int("La cantidad deben ser un número entero.")
    .min(0, "La cantidad no puede ser negativa."),

    accion: z.enum(['aumento', 'disminucion'], {
    required_error: "La acción es obligatoria.",
    invalid_type_error: "La acción debe ser 'aumento' o 'disminucion'.",
    }),

    observacion: z.string().min(1, 'La observacion es obligatoria'),

    usuarioId: z
    .coerce
    .number({
      required_error: "El usuario es obligatorio.",
    })
    .int("El ID del usuario debe ser un número entero.")
    .min(1, "Debe seleccionar un usuario existente."),
});


export const AjusteSchema = {
    create: createAjusteSchema,
};