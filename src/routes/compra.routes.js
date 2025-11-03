import { Router } from 'express';

export const createCompraRouter = ({ compraController }) => {
    const compraRouter = Router();
    compraRouter.get('/', compraController.getAll);
    compraRouter.get('/proveedor/:proveedorId', compraController.getByProveedor);
    compraRouter.get('/:id', compraController.getById);
    compraRouter.post('/', compraController.create);
    compraRouter.put('/:id/aplicar', compraController.aplicarCompra);
    compraRouter.delete('/:id', compraController.delete);
    return compraRouter;
};
