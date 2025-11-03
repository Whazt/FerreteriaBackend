import { z } from 'zod';

const UpdateEstadoPedidoSchema = z.object({
    accion: z.enum(['pendiente', 'pagado', 'enviado', 'cancelado'], {
    invalid_type_error: "La acción debe ser 'pemdiente' o 'pagado' o 'enviado' o 'cancelado'.",
    }).optional()
});


export const PedidoSchema = {
    UPDATE: UpdateEstadoPedidoSchema,
};