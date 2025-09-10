import { sequelize } from './src/config/db.js';
import { DataTypes } from 'sequelize';
//Modelos
import categoriaModel from './src/models/categoria.model.js';
import { usuarioModel } from './src/models/usuario.model.js';
import { rolModel } from './src/models/rol.model.js';
//Relaciones
import { Relaciones } from './src/models/relaciones.js';
//Helpers
import { ZodValidator } from './src/helpers/zodValidator.js';
//Schemas
import { CategoriaSchema } from './src/schemas/categoria.schema.js';
//Servicios
import { CategoriaServices } from './src/services/categoria.services.js';
//Controladores
import { CategoriaController } from './src/controllers/categoria.controller.js';


export class Container{
    constructor(){
        //Modelos
        this.usuarioModel = usuarioModel(sequelize, DataTypes);
        this.rolModel = rolModel(sequelize, DataTypes);
        this.categoriaModel = categoriaModel;
        //Relaciones
        const modelos = {
            usuarioModel: this.usuarioModel,
            rolModel: this.rolModel
        };
        Relaciones(modelos);
        //Helpers
        this.zodValidator = new ZodValidator();
        //Schemas
        this.categoriaSchema = CategoriaSchema;
        //Servicios
        this.categoriaServices = new CategoriaServices({
            categoriaModel: this.categoriaModel,
            zodValidator: this.zodValidator,
            categoriaSchema: this.categoriaSchema
        });
        //Controladores
        this.categoriaController = new CategoriaController({
            categoriaServices: this.categoriaServices
        });
    }
}
