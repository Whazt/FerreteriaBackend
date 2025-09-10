export class ZodValidator {
    validate(schema, data) {
        const result = schema.safeParse(data);
        if (!result.success) {
        const error = new Error('Validación fallida');
        error.status = 400;
        error.details = result.error.errors.map(err => ({
            campo: err.path.join('.'),
            mensaje: err.message
        }));
        throw error;
        }
        return result.data;
    }
}