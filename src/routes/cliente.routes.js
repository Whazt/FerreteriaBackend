import { Router } from 'express';

export const createClientoRouter = ({clienteController}) => {
    const clienteRouter = Router();
    clienteRouter.get('/', clienteController.getAll);
    clienteRouter.get('/:id', clienteController.getById);  
    clienteRouter.post('/', clienteController.crete);
    clienteRouter.put('/:id', clienteController.update);
    clienteRouter.delete('/:id', clienteController.delete);
    return clienteRouter;
}