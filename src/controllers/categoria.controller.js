import { HostNotFoundError } from "sequelize";

//CRUD Categorias
export class CategoriaController{
    constructor({categoriaServices}){
        this.categoriaServices = categoriaServices;
    }

    getCategorias = async(req, res) => {
        try{
            const categorias = await this.categoriaServices.getAllCategorias();
            res.json(categorias);
        }catch(error){
            console.error('Error al obtener las categorías:', error);
            res.status(500).json({message: 'Error al obtener las categorías'});
        }
    }; 

    getCategoriaById = async(req, res) => {
        try{
            const {id} = req.params;
            const categoria = await this.categoriaServices.getCategoriaById(id);
            if(!categoria) return res.status(404).json({message: 'Categoría no encontrada'});
            res.json(categoria);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    };

    createCategoria = async(req, res) => {
        try{
            const newCategoria = await this.categoriaServices.createCategoria(req.body);
            res.status(201).json(newCategoria);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    };

    updateCategoria = async(req, res) => {
        try{
            const {id} = req.params;
            const updated = await this.categoriaServices.updateCategoria(id, req.body);
            if(!updated) return res.status(404).json({message: 'Categoría no encontrada'});
            res.json({message: 'Categoría actualizada correctamente'});
        }catch(error){
            res.status(500).json({ error: error.message });
        }   
    };

    deleteCategoria = async(req, res) => {
        try{
            const {id} = req.params;
            const deleted = await this.categoriaServices.deleteCategoria(id);
            if(!deleted) return res.status(404).json({message: 'Categoría no encontrada'});
            res.json({message: 'Categoría eliminada correctamente'});
        }catch(error){
            
            res.status(500).json({ error: error.message });
        }
    };
}
