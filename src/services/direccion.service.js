export class DireccionServices{
    constructor({direccionModel, zodValidator, direccionSchema }){
        this.direccion = direccionModel;
        this.validator = zodValidator;
        this.schema = direccionSchema;
    }

    async getAll(){
        return await this.direccion.findAll();
    }

    async getById(id){
        const direccion = await this.direccion.findByPk(id);
        return direccion ? direccion : {message: 'Dirección No Encontrado'}
    }

    async create(data){
        //const validatedData = this.validator.validate(this.schema.create, data);
        return await this.direccion.create(data);
    }

    async update(id, data){
        const direccion = await this.direccion.findByPk(id);
        if(!direccion) throw new Error('Dirección no encontrado');
        //const validatedData = this.validator.validate(this.schema.update, data);
        return await direccion.update(data);
    }

    async delete(id){
        const direccion = await this.direccion.findByPk(id);
        if(!direccion) throw new Error('Dirección no encontradoS');
        return await direccion.destroy();
    }
}