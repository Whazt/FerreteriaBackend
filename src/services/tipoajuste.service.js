export class TipoAjusteServices{
    constructor({tipoajusteModel, zodValidator, tipoajusteSchema }){
        this.tipoajuste = tipoajusteModel;
        this.validator = zodValidator;
        this.schema = tipoajusteSchema;
    }

    async getAll(){
        return await this.tipoajuste.findAll();
    }

    async getById(id){
        const tipoajuste = await this.tipoajuste.findByPk(id);
        return tipoajuste ? tipoajuste : {message: 'Tipo de Ajuste No Encontrado'}
    }

    async create(data){
        console.log('llega service');
        //const validatedData = this.validator.validate(this.schema.create, data);
        console.log('retorna service')
        return await this.tipoajuste.create(data);
    }

    async update(id, data){
        const tipoajuste = await this.tipoajuste.findByPk(id);
        if(!tipoajuste) throw new Error('Tipo de Ajuste no encontrado');
        //const validatedData = this.validator.validate(this.schema.update, data);
        return await tipoajuste.update(data);
    }

    async delete(id){
        const tipoajuste = await this.tipoajuste.findByPk(id);
        if(!tipoajuste) throw new Error('Tipo de Ajuste no encontradoS');
        return await tipoajuste.destroy();
    }
}