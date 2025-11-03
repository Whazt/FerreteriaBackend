import { Router } from 'express';

export const createRolRouter = ({rolController}) => {
    const rolRouter = Router();
    rolRouter.get('/', rolController.getAll);
    rolRouter.get('/:id', rolController.getById);  
    rolRouter.post('/', rolController.create);
    rolRouter.put('/:id', rolController.update);
    rolRouter.delete('/:id', rolController.delete);
    return rolRouter;
}