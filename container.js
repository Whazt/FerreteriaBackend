import { sequelize } from './src/config/db.js';
import { DataTypes } from 'sequelize';
//Modelos
import { categoriaModel } from './src/models/categoria.model.js';
import { usuarioModel } from './src/models/usuario.model.js';
import { rolModel } from './src/models/rol.model.js';
import { clienteModel} from './src/models/cliente.model.js';
import { productoModel } from './src/models/producto.model.js';
import { carritoModel } from './src/models/carrito.model'
//Relaciones
import { Relaciones } from './src/models/relaciones.js';
//Helpers
import { ZodValidator } from './src/helpers/zodValidator.js';
//Schemas
import { authSchema } from './src/schemas/auth.schema.js';
import { CategoriaSchema } from './src/schemas/categoria.schema.js';
import { CarritoSchema } from './src/schemas/carrito.schema.js';
import { ClienteSchema } from './src/schemas/cliente.schema.js';
import { ProductoSchema } from './src/schemas/producto.schema.js';
import { RolSchema } from './src/schemas/rol.schema.js';
import { UserSchema } from './src/schemas/user.schema.js';
//Servicios
import { AuthServices } from './src/services/auth.service.js';
import { CategoriaServices } from './src/services/categoria.service.js';
import { CarritoServices } from './src/services/carrito.service.js';
import { ClienteServices } from './src/services/cliente.service.js';
import { ProductoServices } from './src/services/producto.service.js';
import { RolServices } from './src/services/rol.service.js';
import { UsuarioServices } from './src/services/user.service.js';
//Controladores
import { AuthController } from './src/controllers/auth.controller.js';
import { CategoriaController } from './src/controllers/categoria.controller.js';
import { CarritoController } from './src/controllers/carrito.controller.js';
import { ClienteController } from './src/controllers/cliente.controller.js';
import { ProductoController } from './src/controllers/producto.controller.js';

export class Container{
    constructor(){
        //MODELOS
        this.usuarioModel = usuarioModel(sequelize, DataTypes);
        this.rolModel = rolModel(sequelize, DataTypes);
        this.carritoModel = carritoModel(sequelize, DataTypes);
        this.clienteModel = clienteModel(sequelize, DataTypes);
        this.categoriaModel = categoriaModel(sequelize,DataTypes);
        this.productoModel = productoModel(sequelize, DataTypes);
        //RELACIONES
        const modelos = {
            usuarioModel: this.usuarioModel,
            rolModel: this.rolModel,
            clienteModel: this.clienteModel,
            carritoModel: this.carritoModel,
            categoriaModel: this.categoriaModel,
            productoModel: this.productoModel
        };
        Relaciones(modelos);

        //HELPERS
        this.zodValidator = new ZodValidator();

        //SCHEMAS
        this.authSchema = authSchema;
        this.categoriaSchema = CategoriaSchema;
        this.carritoSchema = CarritoSchema;
        this.clienteSchema = ClienteSchema;
        this.productoSchema = ProductoSchema;
        this.rolSchema = RolSchema;
        this.userSchema = UserSchema;

        //SERVICIOS
        this.authServices = new AuthServices({
            userModel: this.usuarioModel,
            clienteModel: this.clienteModel,
            zodValidator: this.zodValidator,
            authSchema: this.authSchema
        });
        this.categoriaServices = new CategoriaServices({
            categoriaModel: this.categoriaModel,
            zodValidator: this.zodValidator,
            categoriaSchema: this.categoriaSchema
        });
        this.carritoServices = new CarritoServices({
            carritoModel: this.carritoModel,
            zodValidator: this.zodValidator,
            carritoSchema: this.carritoSchema
        });
        this.clienteServices = new ClienteServices({
            clienteModel: this.clienteModel,
            zodValidator: this.zodValidator,
            clienteSchema: this.clienteSchema
        });
        this.productoServices = new ProductoServices({
            productoModel: this.productoModel,
            zodValidator: this.zodValidator,
            productoSchema: this.productoSchema
        })


        //CONTROLADORES
        this.authController = new AuthController({
            authServices: this.authServices
        });
        this.categoriaController = new CategoriaController({
            categoriaServices: this.categoriaServices
        });
        this.carritoController = new CarritoController({
            carritoServices: this.carritoServices
        });
        this.clienteController = new ClienteController({
            clienteServices: this.clienteServices
        });
        this.productoController = new ProductoController({
            productoServices: this.productoServices
        });

    }
}
