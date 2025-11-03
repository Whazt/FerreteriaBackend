import { email, z } from 'zod';

const createProveedorSchema = z.object({
    nombres: z.string().min(1, 'El nombre es obligatorio'),
    telefono: z.string()
        .regex(/^\d{8}$/, {
            message: 'El número debe tener exactamente 8 dígitos numéricos',
        }),
     email: z.string().
        email({ message: 'El correo no tiene un formato válido' })
        .min(5, { message: 'El correo es demasiado corto' })
        .max(50, { message: 'El correo no puede exceder 50 caracteres' })
        .trim(),
});

const updateProveedorSchema = z.object({
 nombres: z.string().min(1).optional(),
 email: z.string().
        email({ message: 'El correo no tiene un formato válido' })
        .min(5, { message: 'El correo es demasiado corto' })
        .max(50, { message: 'El correo no puede exceder 50 caracteres' })
        .trim()
        .optional(),
    telefono: z.string().regex(/^\d{8}$/, {
            message: 'El número debe tener exactamente 8 dígitos numéricos',
        }).optional()
});

export const ProveedorSchema = {
    create: createProveedorSchema,
    update: updateProveedorSchema
};