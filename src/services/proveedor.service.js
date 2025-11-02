export class ProveedorServices {
    constructor({ proveedorModel, zodValidator, proveedorSchema }) {
        this.proveedor = proveedorModel;
        this.validator = zodValidator;
        this.schema = proveedorSchema;
    }
    
    async getAll() {
        return await this.proveedor.findAll();
    }

    async getById(id) {
        const proveedor = await this.proveedor.findByPk(id);
        return proveedor ? proveedor : { message: 'Proveedor No Encontrado' };
    }

    async create(data) {
        const validatedData = this.validator.validate(this.schema.create, data);
        return await this.proveedor.create(validatedData);
    }

    async update(id, data) {
        const proveedor = await this.proveedor.findByPk(id);
        if (!proveedor) throw new Error('Proveedor no encontrado');
        const validatedData = this.validator.validate(this.schema.update, data);
        return await proveedor.update(validatedData);
    }

    async delete(id) {
        const proveedor = await this.proveedor.findByPk(id);
        if (!proveedor) throw new Error('Proveedor no encontrado');
        return await proveedor.destroy();
    }
}
