export class CategoriaServices{
    constructor({categoriaModel, zodValidator, categoriaSchema }){
        this.categoria = categoriaModel;
        this.validator = zodValidator;
        this.schema = categoriaSchema;
    }

    async getAllCategorias(){
        return await this.categoria.findAll();
    }

    async getCategoriaById(id){
        return await this.categoria.findByPk(id);
    }

    async createCategoria(data){
        const validatedData = this.validator.validate(this.schema.create, data);
        return await this.categoria.create(validatedData);
    }

    async updateCategoria(id, data){
        const categoria = await this.categoria.findByPk(id);
        if(!categoria) throw new Error('Categoría no encontrada');
        const validatedData = this.validator.validate(this.schema.update, data);
        return await categoria.update(validatedData);
    }

    async deleteCategoria(id){
        const categoria = await this.categoria.findByPk(id);
        if(!categoria) throw new Error('Categoría no encontrada');
        return await categoria.destroy();
    }

}