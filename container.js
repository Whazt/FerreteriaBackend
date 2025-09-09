import categoriaModel from './src/models/categoria.model.js';
import { CategoriaController } from './src/controllers/categoria.controller.js';
import { CategoriaServices } from './src/services/categoria.services.js';

export class Container{
    constructor(){
        this.categoriaModel = categoriaModel;
        this.categoriaServices = new CategoriaServices({categoriaModel: this.categoriaModel});
        this.categoriaController = new CategoriaController({categoriaServices: this.categoriaServices});
    }
}
