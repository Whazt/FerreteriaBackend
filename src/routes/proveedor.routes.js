import { Router } from 'express';

export const createProveedorRouter = ({proveedorController}) => {
    const proveedorRouter = Router();
    proveedorRouter.get('/', proveedorController.getAll);
    proveedorRouter.get('/:id', proveedorController.getById);  
    proveedorRouter.post('/', proveedorController.create);
    proveedorRouter.put('/:id', proveedorController.update);
    proveedorRouter.delete('/:id', proveedorController.delete);
    return proveedorRouter;
}