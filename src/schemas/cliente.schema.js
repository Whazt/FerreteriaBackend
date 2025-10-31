import { z } from 'zod';

const createClienteSchema = z.object({
    nombres: z.string()
        .min(2, {message: 'Debe contener al menos 2 caracteres'})
        .max(50, { message: 'No debe sobrepasar los 50 caracteres'} )
        .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {message: 'Solo se permiten letras y espacios'}
        )
        .trim(),
    apellidos: z.string()
        .min(2, {message: 'Debe contener al menos 2 caracteres'})
        .max(50, { message: 'No debe sobrepasar los 50 caracteres'} )
        .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {message: 'Solo se permiten letras y espacios'}
        )
        .trim(),
    telefono: z.string()
        .regex(/^\d{8}$/, {
            message: 'El número debe tener exactamente 8 dígitos numéricos',
        }),
    usuarioId: z.integer("Debe ser un numero entero"),
});

const updateClienteSchema = z.object({
    nombres: z.string()
        .min(2, {message: 'Debe contener al menos 2 caracteres'})
        .max(50, { message: 'No debe sobrepasar los 50 caracteres'} )
        .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {message: 'Solo se permiten letras y espacios'}
        )
        .trim()
        .optional(),
    apellidos: z.string()
        .min(2, {message: 'Debe contener al menos 2 caracteres'})
        .max(50, { message: 'No debe sobrepasar los 50 caracteres'} )
        .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {message: 'Solo se permiten letras y espacios'}
        )
        .trim()
        .optional(),
    telefono: z.string().regex(/^\d{8}$/, {
            message: 'El número debe tener exactamente 8 dígitos numéricos',
        }).optional()
});

export const ClienteSchema = {
    create: createClienteSchema,
    update: updateClienteSchema
};