
//CRUD Categorias
export class CategoriaController{
    constructor({categoriaServices}){
        this.categoriaServices = categoriaServices;
    }

    getCategorias = async(req, res) => {
        try{
            const categorias = await this.categoriaServices.getAllCategorias();
            res.json(categorias);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    }; 

    getCategoriaById = async(req, res) => {
        try{
            const {id} = req.params;
            const categoria = await this.categoriaServices.getCategoriaById(id);
            if(!categoria) return res.status(404).json({message: 'Categoría no encontrada'});
            res.json(categoria);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    createCategoria = async(req, res) => {
        try{
            const newCategoria = await this.categoriaServices.createCategoria(req.body);
            res.status(201).json(newCategoria);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    updateCategoria = async(req, res) => {
        try{
            const {id} = req.params;
            const updated = await this.categoriaServices.updateCategoria(id, req.body);
            if(!updated) return res.status(404).json({message: 'Categoría no encontrada'});
            res.json({message: 'Categoría actualizada correctamente'});
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        } 
    };

    deleteCategoria = async(req, res) => {
        try{
            const {id} = req.params;
            const deleted = await this.categoriaServices.deleteCategoria(id);
            if(!deleted) return res.status(404).json({message: 'Categoría no encontrada'});
            res.json({message: 'Categoría eliminada correctamente'});
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}
