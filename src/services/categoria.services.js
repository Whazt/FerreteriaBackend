export class CategoriaServices{
    constructor({categoriaModel}){
        this.categoriaModel = categoriaModel;
    }

    async getAllCategorias(){
        return await this.categoriaModel.findAll();
    }

    async getCategoriaById(id){
        return await this.categoriaModel.findByPk(id);
    }

    async createCategoria(data){
        return await this.categoriaModel.create(data);
    }

    async updateCategoria(id, data){
        const categoria = await this.categoriaModel.findByPk(id);
        if(!categoria) throw new Error('Categoría no encontrada');
        return await categoria.update(data);
    }

    async deleteCategoria(id){
        const categoria = await this.categoriaModel.findByPk(id);
        if(!categoria) throw new Error('Categoría no encontrada');
        return await categoria.destroy();
    }

}