import { Router } from 'express';

export const createDireccionRouter = ({direccionController}) => {
    const direccionRouter = Router();
    direccionRouter.get('/', direccionController.getAll);
    direccionRouter.get('/:id', direccionController.getById);  
    direccionRouter.post('/', direccionController.create);
    direccionRouter.put('/:id', direccionController.update);
    direccionRouter.delete('/:id', direccionController.delete);
    return direccionRouter;
}