import { sequelize } from './src/config/db.js';
import { DataTypes } from 'sequelize';
//Modelos
import categoriaModel from './src/models/categoria.model.js';
import { usuarioModel } from './src/models/usuario.model.js';
import { rolModel } from './src/models/rol.model.js';
import { clienteModel} from './src/models/cliente.model.js';
//Relaciones
import { Relaciones } from './src/models/relaciones.js';
//Helpers
import { ZodValidator } from './src/helpers/zodValidator.js';
//Schemas
import { authSchema } from './src/schemas/auth.schema.js';
import { CategoriaSchema } from './src/schemas/categoria.schema.js';
//Servicios
import { AuthServices } from './src/services/auth.services.js';
import { CategoriaServices } from './src/services/categoria.services.js';
//Controladores
import { AuthController } from './src/controllers/auth.controller.js';
import { CategoriaController } from './src/controllers/categoria.controller.js';


export class Container{
    constructor(){
        //Modelos
        this.usuarioModel = usuarioModel(sequelize, DataTypes);
        this.rolModel = rolModel(sequelize, DataTypes);
        this.clienteModel = clienteModel(sequelize, DataTypes);
        // this.categoriaModel = categoriaModel;
        //Relaciones
        const modelos = {
            usuarioModel: this.usuarioModel,
            rolModel: this.rolModel,
            clienteModel: this.clienteModel
        };
        Relaciones(modelos);
        //Helpers
        this.zodValidator = new ZodValidator();
        //Schemas
        this.authSchema = authSchema;
        // this.categoriaSchema = CategoriaSchema;

        //Servicios
        this.authServices = new AuthServices({
            userModel: this.usuarioModel,
            clienteModel: this.clienteModel,
            zodValidator: this.zodValidator,
            authSchema: this.authSchema
        });

        // this.categoriaServices = new CategoriaServices({
        //     categoriaModel: this.categoriaModel,
        //     zodValidator: this.zodValidator,
        //     categoriaSchema: this.categoriaSchema
        // });
        //Controladores
        this.authController = new AuthController({
            authServices: this.authServices
        });
        // this.categoriaController = new CategoriaController({
        //     categoriaServices: this.categoriaServices
        // });
    }
}
