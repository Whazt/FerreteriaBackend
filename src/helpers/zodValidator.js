export class ZodValidator {
    validate(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        console.log('Data: ', data);
        const error = new Error('Validación fallida');
        error.status = 400;
        const erroresZod = result.error?.errors;
        if (Array.isArray(erroresZod)) {
            error.details = erroresZod.map(err => ({
            campo: err.path.join('.'),
            mensaje: err.message
            }));
        } else {
            error.details = [{ campo: 'desconocido', mensaje: 'Error de validación inesperado' }];
        }
        throw error;
    }
    return result.data;
    }
}
