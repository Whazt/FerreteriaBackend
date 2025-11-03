import { Router } from 'express';

export const createAjusteRouter = ({ ajusteController }) => {
    const ajusteRouter = Router();
    ajusteRouter.get('/', ajusteController.getAll);
    ajusteRouter.get('/producto/:productoId', ajusteController.getByProducto);
    ajusteRouter.post('/', ajusteController.create);
    ajusteRouter.delete('/:id', ajusteController.delete);
    return ajusteRouter;
};
