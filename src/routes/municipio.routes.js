import { Router } from 'express';

export const createMunicipioRouter = ({municipioController}) => {
    const municipioRouter = Router();
    municipioRouter.get('/', municipioController.getAll);
    municipioRouter.get('/:id', municipioController.getById);  
    municipioRouter.post('/', municipioController.create);
    municipioRouter.put('/:id', municipioController.update);
    municipioRouter.delete('/:id', municipioController.delete);
    return municipioRouter;
}