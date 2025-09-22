export class ZodValidator {
    validate(schema, data) {
        const result = schema.safeParse(data);
        if (!result.success) {
            const error = new Error('Validación fallida');
            error.status = 400;
            const erroresZod = result.error?.issues;
            error.details = Array.isArray(erroresZod)
            ? erroresZod.map(err => ({
                campo: err.path.join('.'),
                mensaje: err.message,
                tipo: err.code, 
            }))
            : [{ campo: 'desconocido', mensaje: 'Error de validación inesperado' }];
            throw error;
        }
        return result.data;
    }
}
