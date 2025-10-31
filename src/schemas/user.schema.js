import { z } from 'zod';

const createUserSchema = z.object({
    email: z.string().
        email({ message: 'El correo no tiene un formato válido' })
        .min(5, { message: 'El correo es demasiado corto' })
        .max(50, { message: 'El correo no puede exceder 50 caracteres' })
        .trim(),
    password: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .max(64, { message: 'La contraseña no puede exceder 64 caracteres' })
        .trim(),
    rolId: z.integer("Debe ser un numero entero"),
});

const updateUserSchema = z.object({
    email: z.string()
        .email({ message: 'El correo no tiene un formato válido' })
        .min(5, { message: 'El correo es demasiado corto' })
        .max(50, { message: 'El correo no puede exceder 50 caracteres' })
        .trim().optional(),
    password: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .max(64, { message: 'La contraseña no puede exceder 64 caracteres' })
        .regex(/[A-Z]/, { message: 'Debe contener al menos una letra mayúscula' })
        .regex(/[a-z]/, { message: 'Debe contener al menos una letra minúscula' })
        .regex(/\d/, { message: 'Debe contener al menos un número' })
        .trim().optional(),
    rolId: z.integer("Debe ser un numero entero").optional()
});

export const authSchema = {
    create: createUserSchema,
    update: updateUserSchema
};