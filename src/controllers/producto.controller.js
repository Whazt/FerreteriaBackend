export class ProductoController{
    constructor({productoServices}){
        this.productoService = productoServices
    }
    //Visualización del cliente
    getAll = async (req, res) => {
        try {
            const resultado = await this.productoService.getAll(req.query);
            res.status(200).json(resultado);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    }

    getById = async (req, res) => {
        try{
            const { id } = req.params;
            const producto = await this.productoService.getById(id);
            res.status(200).json(producto);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    }

    create = async(req, res) => {
        try{
            const newProducto = await this.productoService.create(req.body);
            res.status(201).json(newProducto);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    update = async(req, res) => {
        try{
            const {id} = req.params;
            const updated = await this.productoService.update(id, req.body);
            if(!updated) return res.status(404).json({message: 'Producto no encontrado'});
            res.status(200).json({ message: 'Producto actualizado correctamente', data: updated });
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        } 
    };

    delete = async(req, res) => {
        try{
            const {id} = req.params;
            const deleted = await this.productoService.delete(id);
            if(!deleted) return res.status(404).json({message: 'Producto no encontrado'});
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        } 
    };
}