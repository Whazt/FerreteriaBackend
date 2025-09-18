import { z } from 'zod';

const loginSchema = z.object({
    email: z.email({ message: 'El correo no tiene un formato válido' })
        .min(5, { message: 'El correo es demasiado corto' })
        .max(50, { message: 'El correo no puede exceder 50 caracteres' })
        .trim(),
    password: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .max(64, { message: 'La contraseña no puede exceder 64 caracteres' })
        .trim()
});

const registerSchema = z.object({
    email: z.string()
        .email({ message: 'El correo no tiene un formato válido' })
        .min(5, { message: 'El correo es demasiado corto' })
        .max(50, { message: 'El correo no puede exceder 50 caracteres' })
        .trim(),
    password: z.string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .max(64, { message: 'La contraseña no puede exceder 64 caracteres' })
        .regex(/[A-Z]/, { message: 'Debe contener al menos una letra mayúscula' })
        .regex(/[a-z]/, { message: 'Debe contener al menos una letra minúscula' })
        .regex(/\d/, { message: 'Debe contener al menos un número' })
        .trim(),
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
        })
});

export const authSchema = {
    register: registerSchema,
    login: loginSchema
};