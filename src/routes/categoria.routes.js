import { Router } from 'express';


export const createCategoriaRouter = ({categoriaController}) => {
    const categoriaRouter = Router();

    categoriaRouter.get('/', categoriaController.getCategorias);
    categoriaRouter.get('/:id', categoriaController.getCategoriaById);
    categoriaRouter.post('/', categoriaController.createCategoria);
    categoriaRouter.put('/:id', categoriaController.updateCategoria);
    categoriaRouter.delete('/:id', categoriaController.deleteCategoria);

    return categoriaRouter;
}
