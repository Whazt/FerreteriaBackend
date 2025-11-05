import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middlewares.js'

export const createCarritoRouter = ({ carritoController }) => {
    const carritoRouter = Router();
    carritoRouter.use(authMiddleware);
    carritoRouter.get('/', carritoController.getCarrito);
    carritoRouter.post('/', carritoController.agregarProducto);
    carritoRouter.put('/', carritoController.ajustarCantidad);
    carritoRouter.delete('/', carritoController.eliminarProducto);
    carritoRouter.delete('/limpiar', carritoController.limpiarCarrito);
    carritoRouter.get('/total', carritoController.calcularTotal);
    carritoRouter.post('/sincronizar', carritoController.sincronizarCarritoLocal);
    return carritoRouter;
};