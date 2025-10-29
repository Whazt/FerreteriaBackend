export class ProductoController{
    constructor({productoServices}){
        this.productoService = productoServices
    }
    //Visualización del cliente
    getProductoAll = async (req, res) => {
        try {
            const resultado = await productoService.getAll(req.query);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    }

    getProductoById = async (req, res) => {
        try{
            const id = req.params;
            const producto = this.productoService.getById(id);
            res.status(201).json(producto);
        }catch(error){
            res.status(500).json({ error: 'Producto no encontrado' });
        }
    }

    createProducto = async(req, res) => {
        try{
            const newProducto = await this.productoService.createProducto(req.body);
            res.status(201).json(newProducto);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    updateProducto = async(req, res) => {
        try{
            const {id} = req.params;
            const updated = await this.productoService.updateProducto(id, req.body);
            if(!updated) return res.status(404).json({message: 'Producto no encontrado'});
            res.json({message: 'Producto actualizado correctamente'});
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        } 
    };

    deleteProducto = async(req, res) => {
        try{
            const {id} = req.params;
            const deleted = await this.productoService.deleteProducto(id);
            if(!deleted) return res.status(404).json({message: 'Producto no encontrado'});
            res.json({message: 'Producto eliminado correctamente'});
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    };
}