import { z } from 'zod';

const createDepartamentoSchema = z.object({
   departamento: z.string().min(1, 'El nombre es obligatorio'),
});

const updateDepartamentoSchema = z.object({
    departamento: z.string().min(1).optional()
});

export const DepartamentoSchema = {
    create: createDepartamentoSchema,
    update: updateDepartamentoSchema
};