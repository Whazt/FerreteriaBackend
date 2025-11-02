import { z } from 'zod';

const createDireccionSchema = z.object({
 direccion: z
    .string()
    .min(1, "La dirección no puede estar vacía."),

  referencias: z
    .string().optional(),

  cliente_id: z
    .coerce
    .number({
      required_error: "El cliente es obligatorio.",
    })
    .int("El ID del cliente debe ser un número entero.")
    .min(1, "Debe seleccionar un cliente existente."),

    municipio_id: z
    .coerce
    .number({
      required_error: "El municipio es obligatorio.",
    })
    .int("El ID del municipio debe ser un número entero.")
    .min(1, "Debe seleccionar un municipio existente."),

    por_defecto: z
    .boolean().optional(),
});

const updateDireccionSchema = z.object({
direccion: z.string().min(1).optional(),
referencias: z.string().optional(),
cliente_id: z.int().min(1).optional(),
municipio_id: z.int().min(1).optional(),
por_defecto: z.boolean().optional(),
});

export const DireccionSchema = {
    create: createDireccionSchema,
    update: updateDireccionSchema
};