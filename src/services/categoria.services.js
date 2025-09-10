export class CategoriaServices{
    constructor({categoriaModel, zodValidator, categoriaSchema }){
        this.categoriaModel = categoriaModel;
        this.zodValidator = zodValidator;
        this.schema = categoriaSchema;
    }

    async getAllCategorias(){
        return await this.categoriaModel.findAll();
    }

    async getCategoriaById(id){
        return await this.categoriaModel.findByPk(id);
    }

    async createCategoria(data){
        const validatedData = this.zodValidator.validate(this.schema.create, data);
        return await this.categoriaModel.create(validatedData);
    }

    async updateCategoria(id, data){
        const categoria = await this.categoriaModel.findByPk(id);
        if(!categoria) throw new Error('Categoría no encontrada');
        const validatedData = this.zodValidator.validate(this.schema.update, data);
        return await categoria.update(validatedData);
    }

    async deleteCategoria(id){
        const categoria = await this.categoriaModel.findByPk(id);
        if(!categoria) throw new Error('Categoría no encontrada');
        return await categoria.destroy();
    }

}