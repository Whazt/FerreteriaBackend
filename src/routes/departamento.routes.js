import { Router } from 'express';

export const createDepartamentoRouter = ({departamentoController}) => {
    const departamentoRouter = Router();
    departamentoRouter.get('/', departamentoController.getAll);
    departamentoRouter.get('/:id', departamentoController.getById);  
    departamentoRouter.post('/', departamentoController.create);
    departamentoRouter.put('/:id', departamentoController.update);
    departamentoRouter.delete('/:id', departamentoController.delete);
    return departamentoRouter;
}