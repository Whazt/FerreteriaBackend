export class DepartamentoServices{
    constructor({departamentoModel, zodValidator, departamentoSchema }){
        this.departamento = departamentoModel;
        this.validator = zodValidator;
        this.schema = departamentoSchema;
    }

    async getAll(){
        return await this.departamento.findAll();
    }

    async getById(id){
        const departamento = await this.departamento.findByPk(id);
        return departamento ? departamento : {message: 'Departamento No Encontrado'}
    }

    async create(data){
        const validatedData = this.validator.validate(this.schema.create, data);
        return await this.departamento.create(validatedData);
    }

    async update(id, data){
        const departamento = await this.departamento.findByPk(id);
        if(!departamento) throw new Error('Departamento no encontrado');
        const validatedData = this.validator.validate(this.schema.update, data);
        return await departamento.update(validatedData);
    }

    async delete(id){
        const departamento = await this.departamento.findByPk(id);
        if(!departamento) throw new Error('Departamento no encontradoS');
        return await departamento.destroy();
    }
}