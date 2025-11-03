import { Router } from 'express';

export const createTipoAjusteRouter = ({tipoAjusteController}) => {
    const tipoajusteRouter = Router();
    tipoajusteRouter.get('/', tipoAjusteController.getAll);
    tipoajusteRouter.get('/:id', tipoAjusteController.getById);  
    tipoajusteRouter.post('/', tipoAjusteController.create);
    tipoajusteRouter.put('/:id', tipoAjusteController.update);
    tipoajusteRouter.delete('/:id', tipoAjusteController.delete);
    return tipoajusteRouter;
}