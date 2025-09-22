export class ProductoController{
    constructor({productoServices}){
        this.productoService = productoServices
    }
    //Visualización del cliente
    getAll = async (req, res) => {
        try {
            const resultado = await productoService.getAll(req.query);
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    getById = async (req, res) => {
        try{
            const id = req.params;
            const producto = this.productoService.getById(id);
            res.status(201).json(producto);
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}


