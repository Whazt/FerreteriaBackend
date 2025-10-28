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
        return cliente ? cliente : {message: 'Producto No Encontrado'}
    }

    async create(data){
        return await this.cliente.create(data);
    }

    async update(id,data){
        const cliente = await this.cliente.findByPk(id);
        if(!cliente) throw new Error('Cliente no encontrado');
        return await cliente.update(cliente);
    }

    async delete(id){
        const cliente = await this.cliente.findByPk(id);
        if(!cliente) throw new Error('Cliente no encontrado');
        return await cliente.destroy();
    }
}