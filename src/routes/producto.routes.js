import { Router } from 'express';

export const createProductoRouter = ({productoController}) => {
    const productoRouter = Router();
    productoRouter.get('/', productoController.getAll);
    productoRouter.get('/:id', productoController.getById);  
    productoRouter.post('/', productoController.crete);
    productoRouter.put('/:id', productoController.update);
    productoRouter.delete('/:id', productoController.delete);
    return productoRouter;
}