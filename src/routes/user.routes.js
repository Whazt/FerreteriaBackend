import { Router } from 'express';

export const createUserRouter = ({usuarioController}) => {
    const userRouter = Router();
    userRouter.get('/', usuarioController.getAll);
    userRouter.get('/:id', usuarioController.getById);  
    userRouter.post('/', usuarioController.create);
    userRouter.put('/:id', usuarioController.update);
    userRouter.delete('/:id', usuarioController.delete);
    return userRouter;
}