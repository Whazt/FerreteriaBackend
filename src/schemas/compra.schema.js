import { z } from 'zod';

const aplicarCompraSchema = z.object({
    accion: z.enum(['aumento', 'disminucion'], {
    invalid_type_error: "La acción debe ser 'aumento' o 'disminucion'.",
    }).optional()
});


export const AjusteSchema = {
    UPDATE: aplicarCompraSchema,
};