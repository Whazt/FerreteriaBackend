import { z } from 'zod';

const createCategoriaSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    descripcion: z.string().optional()
});

const updateCategoriaSchema = z.object({
    nombre: z.string().min(1).optional(),
    descripcion: z.string().optional()
});

export const CategoriaSchema = {
    create: createCategoriaSchema,
    update: updateCategoriaSchema
};