import { Router } from 'express';

export const createAuthRouter = ({authController}) => {
    const authRouter = Router();
    authRouter.post('/login', (req, res) => authController.login(req, res));
    authRouter.post('/register', (req, res) => authController.register(req, res));  
    authRouter.post('/refresh', (req, res) => authController.refreshToken(req, res));
    return authRouter;
}