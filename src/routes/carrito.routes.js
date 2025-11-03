import { Router } from 'express';

export const createCarritoRouter = ({carritoController}) => {
    const carritoRouter = Router();
    carritoRouter.get('/:sesionId', carritoController.getCarritoBySesion);
    carritoRouter.post('/', carritoController.agregarProducto);  
    carritoRouter.put('/', carritoController.ajustarCantidad);
    carritoRouter.delete('/', carritoController.eliminarProducto);
    carritoRouter.delete('/:id', carritoController.limpiarCarrito);
    carritoRouter.get('/:sesionId', carritoController.calcularTotal);
    return carritoRouter;
}