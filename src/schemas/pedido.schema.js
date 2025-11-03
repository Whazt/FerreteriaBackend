import { z } from 'zod';

const UpdateEstadoPedidoSchema = z.object({
    clienteId: z
    .coerce
    .number({
      required_error: "El cliente es obligatorio.",
    })
    .int("El ID del cliente debe ser un número entero.")
    .min(1, "Debe seleccionar un cliente existente."),

    accion: z.enum(['pendiente', 'pagado', 'enviado', 'cancelado'], {
    invalid_type_error: "La acción debe ser 'pendiente' o 'pagado' o 'enviado' o 'cancelado'.",
    }).optional()
});


export const PedidoSchema = {
    UPDATE: UpdateEstadoPedidoSchema,
};