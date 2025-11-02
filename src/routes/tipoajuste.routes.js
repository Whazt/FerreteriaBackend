import { Router } from 'express';

export const createTipoAjusteRouter = ({tipoajusteController}) => {
    const tipoajusteRouter = Router();
    tipoajusteRouter.get('/', tipoajusteController.getAll);
    tipoajusteRouter.get('/:id', tipoajusteController.getById);  
    tipoajusteRouter.post('/', tipoajusteController.create);
    tipoajusteRouter.put('/:id', tipoajusteController.update);
    tipoajusteRouter.delete('/:id', tipoajusteController.delete);
    return tipoajusteRouter;
}