import { Router } from 'express';

export const createUserRouter = ({userController}) => {
    const userRouter = Router();
    userRouter.get('/', userController.getAll);
    userRouter.get('/:id', userController.getById);  
    userRouter.post('/', userController.crete);
    userRouter.put('/:id', userController.update);
    userRouter.delete('/:id', userController.delete);
    return userRouter;
}