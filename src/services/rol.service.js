export class ClienteServices{
    constructor({clienteModel, zodValidator, clienteSchema}){
        this.rol = clienteModel;
        this.validator = zodValidator;
        this.schema = clienteSchema;
    }

    async getAll(){
        return await this.rol.findAll();
    }

    async getById(id){
        const rol = await this.rol.findByPK(id);
        return rol ? rol : {message: 'Cliente No Encontrado'}
    }

    async create(data){
        return await this.rol.create(data);
    }

    async update(id,data){
        const rol = await this.rol.findByPk(id);
        if(!rol) throw new Error('rol no encontrado');
        return await rol.update(rol);
    }

    async delete(id){
        const rol = await this.rol.findByPk(id);
        if(!rol) throw new Error('rol no encontrado');
        return await rol.destroy();
    }
}