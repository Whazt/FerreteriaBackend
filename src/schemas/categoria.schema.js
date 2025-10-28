import { z } from 'zod';

const createCategoriaSchema = z.object({
    categoria: z.string().min(1, 'El nombre es obligatorio'),
    descripcion: z.string().optional()
});

const updateCategoriaSchema = z.object({
    categoria: z.string().min(1).optional(),
    descripcion: z.string().optional()
});

export const CategoriaSchema = {
    create: createCategoriaSchema,
    update: updateCategoriaSchema
};