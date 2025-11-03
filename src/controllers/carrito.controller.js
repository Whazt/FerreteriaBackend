export class CarritoController {
    constructor({ carritoServices }) {
        this.carritoService = carritoServices;
    }

    getCarritoBySesion = async (req, res) => {
        try {
            const { sesionId } = req.params;
            const items = await this.carritoService.getCarritoBySesion(sesionId);
            res.status(200).json(items);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    agregarProducto = async (req, res) => {
        try {
            const { sesionId, productoId, cantidad } = req.body;
            const resultado = await this.carritoService.agregarProducto({ sesionId, productoId, cantidad });
            res.status(201).json(resultado);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    ajustarCantidad = async (req, res) => {
        try {
            const resultado = await this.carritoService.ajustarCantidad({ data: req.body });
            res.status(200).json(resultado);
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    eliminarProducto = async (req, res) => {
        try {
            const resultado = await this.carritoService.eliminarProducto({ data: req.body });
            res.status(200).json({ mensaje: 'Producto eliminado del carrito', resultado });
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    limpiarCarrito = async (req, res) => {
        try {
            const { sesionId } = req.params;
            await this.carritoService.limpiarCarrito(sesionId);
            res.status(200).json({ mensaje: 'Carrito limpiado correctamente' });
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    calcularTotal = async (req, res) => {
        try {
            const { sesionId } = req.params;
            const total = await this.carritoService.calcularTotal(sesionId);
            res.status(200).json({ total });
        }catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}