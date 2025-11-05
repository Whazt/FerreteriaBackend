export class CarritoController {
    constructor({ carritoServices }) {
        this.carritoServices = carritoServices;
    }
    // Obtener carrito actual del usuario logueado
    getCarrito = async (req, res) => {
        try {
            const usuarioId = req.user.id;
            const carrito = await this.carritoServices.getCarritoByUsuario(usuarioId);
            return res.json(carrito);
        } catch (error) {
            console.error('Error al obtener carrito:', error);
            return res.status(500).json({ error: error.message });
        }
    };
    // Agregar producto al carrito
    agregarProducto = async (req, res) => {
        try {
            const usuarioId = req.user.id;
            const data = { ...req.body, usuarioId };
            const result = await this.carritoServices.agregarProducto({ data });
            return res.json(result);
        } catch (error) {
            console.error('Error al agregar producto:', error);
            return res.status(400).json({ error: error.message });
        }
    };
    // Ajustar cantidad (sumar/restar)
    ajustarCantidad = async (req, res) => {
        try {
            const usuarioId = req.user.id;
            const data = { ...req.body, usuarioId };
            const result = await this.carritoServices.ajustarCantidad({ data });
            return res.json(result);
        } catch (error) {
            console.error('Error al ajustar cantidad:', error);
            return res.status(400).json({ error: error.message });
        }
    };
    // Eliminar un producto específico
    eliminarProducto = async (req, res) => {
        try {
            const usuarioId = req.user.id;
            const data = { ...req.body, usuarioId };
            const result = await this.carritoServices.eliminarProducto({ data });
            return res.json({ eliminado: result > 0 });
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            return res.status(400).json({ error: error.message });
        }
    };
    // Vaciar todo el carrito del usuario
    limpiarCarrito = async (req, res) => {
        try {
            const usuarioId = req.user.id;
            await this.carritoServices.limpiarCarrito(usuarioId);
            return res.json({ mensaje: 'Carrito limpiado correctamente' });
        } catch (error) {
            console.error('Error al limpiar carrito:', error);
            return res.status(500).json({ error: error.message });
        }
    };
    // Calcular total del carrito
    calcularTotal = async (req, res) => {
        try {
            const usuarioId = req.user.id;
            const total = await this.carritoServices.calcularTotal(usuarioId);
            return res.json({ total });
        } catch (error) {
            console.error('Error al calcular total:', error);
            return res.status(500).json({ error: error.message });
        }
    };
    // Sincronizar carrito local al iniciar sesión
    sincronizarCarritoLocal = async (req, res) => {
        try {
            const usuarioId = req.user.id;
            const productosLocal = req.body.productos; 
            if (!Array.isArray(productosLocal)) {
                return res.status(400).json({ error: 'Formato inválido de productos' });
            }
            const result = await this.carritoServices.sincronizarCarritoLocal(usuarioId, productosLocal);
            return res.json({ mensaje: 'Carrito sincronizado correctamente', result });
        } catch (error) {
            console.error('Error al sincronizar carrito local:', error);
            return res.status(500).json({ error: error.message });
        }
    };
}
