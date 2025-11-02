import { sequelize } from './src/config/db.js';
import { DataTypes } from 'sequelize';
//Modelos
import { ajusteModel } from './src/models/ajuste.model.js'
import { carritoModel } from './src/models/carrito.model.js'
import { categoriaModel } from './src/models/categoria.model.js';
import { clienteModel } from './src/models/cliente.model.js';
import { compraModel } from './src/models/compras.model.js';
import { departamentoModel } from './src/models/departamento.model.js';
import { detalleCompraModel } from './src/models/detallecompra.model.js';
import { detallePedidoModel } from './src/models/detallepedido.model.js';
import { direccionModel } from './src/models/direccion.model.js';
import { municipioModel } from './src/models/municipio.model.js';
import { pedidoModel } from './src/models/pedido.model.js';
import { productoModel } from './src/models/producto.model.js';
import { proveedorModel } from './src/models/proveedor.model.js';
import { tipoAjusteModel } from './src/models/tipoajuste.model.js';
import { usuarioModel } from './src/models/usuario.model.js';
import { rolModel } from './src/models/rol.model.js';
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
        this.ajusteModel = ajusteModel( sequelize, DataTypes);
        this.carritoModel = carritoModel(sequelize, DataTypes);
        this.categoriaModel = categoriaModel(sequelize,DataTypes);
        this.clienteModel = clienteModel(sequelize, DataTypes);
        this.compraModel = compraModel(sequelize, DataTypes);
        this.departamentoModel = departamentoModel(sequelize, DataTypes);
        this.detalleCompraModel = detalleCompraModel(sequelize, DataTypes);
        this.detallePedidoModel = detallePedidoModel(sequelize, DataTypes);
        this.direccionModel = direccionModel(sequelize, DataTypes);
        this.municipioModel = municipioModel(sequelize, DataTypes);
        this.pedidoModel = pedidoModel(sequelize, DataTypes);
        this.productoModel = productoModel(sequelize, DataTypes);
        this.proveedorModel = proveedorModel(sequelize, DataTypes);
        this.tipoAjusteModel = tipoAjusteModel(sequelize, DataTypes);
        this.usuarioModel = usuarioModel(sequelize, DataTypes);
        this.rolModel = rolModel(sequelize, DataTypes);
        //RELACIONES
        const modelos = {
            ajusteModel: this.ajusteModel,
            carritoModel: this.carritoModel,
            categoriaModel: this.categoriaModel,
            clienteModel: this.clienteModel,
            compraModel: this.compraModel,
            departamentoModel: this.departamentoModel,
            detalleCompraModel: this.detalleCompraModel,
            detallePedidoModel: this.detallePedidoModel,
            direccionModel: this.direccionModel,
            municipioModel: this.municipioModel,
            pedidoModel: this.pedidoModel,
            productoModel: this.productoModel,
            proveedorModel: this.proveedorModel,
            tipoAjusteModel: this.tipoAjusteModel,            
            usuarioModel: this.usuarioModel,
            rolModel: this.rolModel,
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
