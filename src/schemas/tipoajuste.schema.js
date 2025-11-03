import { z } from 'zod';

const createTipoAjusteSchema = z.object({
    tipoAjuste: z.string().min(1, 'El tipo de ajuste es obligatorio')
});

const updateTipoAjusteSchema = z.object({
    tipoAjuste: z.string().min(1).optional()
});

export const TipoAjusteSchema = {
    create: createTipoAjusteSchema,
    update: updateTipoAjusteSchema
};