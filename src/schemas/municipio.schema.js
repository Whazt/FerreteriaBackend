import { z } from 'zod';


const createMunicipioSchema = z.object({
   municipio: z.string().min(1, 'El nombre es obligatorio'),

    departamentoId: z
    .coerce
    .number({
      required_error: "El departamento es obligatorio.",
    })
    .int("El ID del departamento debe ser un número entero.")
    .min(1, "Debe seleccionar un departamento valido."),
});

const updateMunicipioSchema = z.object({
   municipio: z.string().min(1).optional(),
});

export const MunicipioSchema = {
    create: createMunicipioSchema,
    update: updateMunicipioSchema
};