export class RolServices{
    constructor({rolModel, zodValidator, rolSchema}){
        this.rol = rolModel;
        this.validator = zodValidator;
        this.schema = rolSchema;
    }

    async getAll(){
        return await this.rol.findAll();
    }

    async getById(id){
        const rol = await this.rol.findByPk(id);
        return rol ? rol : {message: 'Rol No Encontrado'}
    }

    async create(data){
        const validatedData = await this.validator.validate(this.schema.create, data);
        return await this.rol.create(validatedData);
    }

    async update(id,data){
        const rol = await this.rol.findByPk(id);
        if(!rol) throw new Error('rol no encontrado');
        const validatedData = await this.validator.validate(this.schema.create, data);
        return await rol.update(validatedData);
    }

    async delete(id){
        const rol = await this.rol.findByPk(id);
        if(!rol) throw new Error('rol no encontrado');
        return await rol.destroy();
    }
}