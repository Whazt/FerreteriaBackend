import { z } from 'zod';

const aplicarCompraSchema = z.object({
    proveedorId: z
    .coerce
    .number({
      required_error: "El proveedor es obligatorio.",
    })
    .int("El ID del proveedor debe ser un número entero.")
    .min(1, "Debe seleccionar un proveedor existente."),

    accion: z.enum(['registrada', 'aplicada'], {
    invalid_type_error: "La acción debe ser 'registrada' o 'aplicada'.",
    }).optional()
});


export const AjusteSchema = {
    UPDATE: aplicarCompraSchema,
};