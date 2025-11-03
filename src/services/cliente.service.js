export class ClienteServices{
    constructor({clienteModel, zodValidator, clienteSchema}){
        this.cliente = clienteModel;
        this.validator = zodValidator;
        this.schema = clienteSchema;
    }

    async getAll(){
        return await this.cliente.findAll();
    }

    async getById(id){
        const cliente = await this.cliente.findByPK(id);
        return cliente ? cliente : {message: 'Cliente No Encontrado'}
    }

    async create(data){
        const validatedData = this.validator.validate(this.schema.create, data);
        return await this.cliente.create(validatedData);
    }

    async update(id,data){
        const cliente = await this.cliente.findByPk(id);
        if(!cliente) throw new Error('Cliente no encontrado');
        const validatedData = await this.validator.validate(this.schema.update, data)
        return await cliente.update(validatedData);
    }

    async delete(id){
        const cliente = await this.cliente.findByPk(id);
        if(!cliente) throw new Error('Cliente no encontrado');
        return await cliente.destroy();
    }
}