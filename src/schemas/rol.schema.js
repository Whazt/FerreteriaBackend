import { z } from 'zod';

const createRolSchema = z.object({
    rol: z.string("El nombre del rol es obligatorio")
});

const updateRolSchema = z.object({
    rol: z.string().optional()
});

export const RolSchema = {
    create: createRolSchema,
    update: updateRolSchema
};