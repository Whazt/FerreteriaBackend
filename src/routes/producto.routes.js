import { Router } from "express";

export const createProductoRouter = ({productoController}) => {
    const productoRouter = Router();
    productoRouter.get('/', (req, res) => productoController.getAll( req, res));
}