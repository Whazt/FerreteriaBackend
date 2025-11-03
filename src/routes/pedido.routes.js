import { Router } from 'express';

export const createPedidoRouter = ({ pedidoController }) => {
    const pedidoRouter = Router();
    pedidoRouter.get('/', pedidoController.getAll);
    pedidoRouter.get('/cliente/:clienteId', pedidoController.getByClient);
    pedidoRouter.get('/:id', pedidoController.getById);
    pedidoRouter.post('/', pedidoController.create);
    pedidoRouter.put('/:id/estado', pedidoController.updateEstado);
    pedidoRouter.delete('/:id', pedidoController.delete);
    return pedidoRouter;
};
