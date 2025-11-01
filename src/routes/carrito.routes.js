import { Router } from 'express';

export const createCarritoRouter = ({carritoController}) => {
    const carritoRouter = Router();
    carritoRouter.get('/', carritoController.getAll);
    carritoRouter.get('/:id', carritoController.getById);  
    carritoRouter.post('/', carritoController.crete);
    carritoRouter.put('/:id', carritoController.update);
    carritoRouter.delete('/:id', carritoController.delete);
    return carritoRouter;
}