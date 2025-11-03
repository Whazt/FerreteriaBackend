export class MunicipioServices{
    constructor({municipioModel, zodValidator, municipioSchema }){
        this.municipio = municipioModel;
        this.validator = zodValidator;
        this.schema = municipioSchema;
    }

    async getAll(){
        return await this.municipio.findAll();
    }

    async getById(id){
        const municipio = await this.municipio.findByPk(id);
        return municipio ? municipio : {message: 'Municipio No Encontrado'}
    }

    async create(data){
        const validatedData = this.validator.validate(this.schema.create, data);
        return await this.municipio.create(validatedData);
    }

    async update(id, data){
        const municipio = await this.municipio.findByPk(id);
        if(!municipio) throw new Error('Municipio no encontrado');
        const validatedData = this.validator.validate(this.schema.update, data);
        return await municipio.update(validatedData);
    }

    async delete(id){
        const municipio = await this.municipio.findByPk(id);
        if(!municipio) throw new Error('Municipio no encontradoS');
        return await municipio.destroy();
    }
}