import { Router } from 'express';

export const createAuthRouter = ({authController}) => {
    const authRouter = Router();
    authRouter.post('/login', authController.login);
    authRouter.post('/register', authController.register);  
    authRouter.post('/refresh', authController.refreshToken);
    //authRouter.post('/logout', authController.logout);
    return authRouter;
}