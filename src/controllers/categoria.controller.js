import Categoria from "../models/categoria.model.js";


//CRUD Categorias
export const getCategorias = async(req, res) => {
    try{
        const categorias = await Categoria.findAll();
        res.json(categorias);
    }catch(error){
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({message: 'Error al obtener las categorías'});
    }
}; 

export const getCategoriaById = async(req, res) => {
    try{
        const {id} = req.params;
        const categoria = await Categoria.findByPk(id);
        if(!categoria) return res.status(404).json({message: 'Categoría no encontrada'});
        res.json(categoria);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const createCategoria = async(req, res) => {
    try{
        const{categoria, descripcion} = req.body;
        const newCategoria = await Categoria.create({categoria, descripcion});
        res.status(201).json(newCategoria);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};

export const updateCategoria = async(req, res) => {
    try{
        const {id} = req.params;
        const {categoria, descripcion, activo} = req.body;
        const categoriaActual = await Categoria.findByPk(id);
        if(!categoriaActual) return res.status(404).json({message: 'Categoría no encontrada'});
        await categoriaActual.update({categoria, descripcion, activo});
        res.json(categoriaActual);
    }catch(error){
        res.status(500).json({ error: error.message });
    }   
};

export const deleteCategoria = async(req, res) => {
    try{
        const {id} = req.params;
        const categoriaActual = await Categoria.findByPk(id);
        if(!categoriaActual) return res.status(404).json({message: 'Categoría no encontrada'});
        await categoriaActual.destroy();
        res.json({message: 'Categoría eliminada correctamente'});
    }catch(error){
        res.status(500).json({ error: error.message });
    }
};