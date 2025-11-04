import { sequelize } from './src/config/db.js';
import { DataTypes } from 'sequelize';
// #region Modelos
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
//#endregion
//Relaciones
import { Relaciones } from './src/models/relaciones.js';
//Helpers
import { ZodValidator } from './src/helpers/zodValidator.js';
//#region Schemas
import { authSchema } from './src/schemas/auth.schema.js';
import { CategoriaSchema } from './src/schemas/categoria.schema.js';
import { CarritoSchema } from './src/schemas/carrito.schema.js';
import { ClienteSchema } from './src/schemas/cliente.schema.js';
import { DepartamentoSchema } from './src/schemas/departamento.schema.js'
import { DireccionSchema } from './src/schemas/direccion.schema.js'
import { MunicipioSchema } from './src/schemas/municipio.schema.js'
import { ProductoSchema } from './src/schemas/producto.schema.js';
import { RolSchema } from './src/schemas/rol.schema.js';
import { ProveedorSchema } from './src/schemas/proveedor.schema.js';
import { TipoAjusteSchema } from './src/schemas/tipoajuste.schema.js';
import { UserSchema } from './src/schemas/user.schema.js';
//#endregion
//#region Servicios
import { AjusteServices } from './src/services/ajuste.service.js';
import { AuthServices } from './src/services/auth.service.js';
import { CategoriaServices } from './src/services/categoria.service.js';
import { CarritoServices } from './src/services/carrito.service.js';
import { ClienteServices } from './src/services/cliente.service.js';
import { CompraServices } from './src/services/compra.service.js';
import { DepartamentoServices } from './src/services/departamento.service.js';
import { DireccionServices } from './src/services/direccion.service.js';
import { MunicipioServices } from './src/services/municipio.service.js';
import { PedidoServices } from './src/services/pedido.service.js';
import { ProductoServices } from './src/services/producto.service.js';
import { ProveedorServices } from './src/services/proveedor.service.js';
import { RolServices } from './src/services/rol.service.js';
import { TipoAjusteServices } from './src/services/tipoajuste.service.js';
import { UsuarioServices } from './src/services/user.service.js';
//#endregion
//#region Controllers
import { AjusteController } from './src/controllers/ajuste.controller.js';
import { AuthController } from './src/controllers/auth.controller.js';
import { CategoriaController } from './src/controllers/categoria.controller.js';
import { CarritoController } from './src/controllers/carrito.controller.js';
import { ClienteController } from './src/controllers/cliente.controller.js';
import { CompraController } from './src/controllers/compra.controller.js';
import { DepartamentoController } from './src/controllers/departamento.controller.js';
import { DireccionController } from './src/controllers/direccion.controller.js';
import { MunicipioController } from './src/controllers/municipio.controller.js';
import { PedidoController} from './src/controllers/pedido.controller.js';
import { ProductoController } from './src/controllers/producto.controller.js';
import { ProveedorController } from './src/controllers/proveedor.controller.js';
import { RolController } from './src/controllers/rol.controller.js';
import { TipoAjusteController } from './src/controllers/tipoajuste.controller.js';
import { UsuarioController } from './src/controllers/user.controller.js';
//#endregion

export class Container{
    constructor(){
        //#region MODELOS
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
        //#endregion
        //HELPERS
        this.zodValidator = new ZodValidator();
        //SCHEMAS
        this.authSchema = authSchema;
        this.categoriaSchema = CategoriaSchema;
        this.carritoSchema = CarritoSchema;
        this.clienteSchema = ClienteSchema;
        this.departamentoSchema = DepartamentoSchema;
        this.direccionSchema = DireccionSchema;
        this.municipioSchema = MunicipioSchema;
        this.productoSchema = ProductoSchema;
        this.proveedorSchema = ProveedorSchema;
        this.rolSchema = RolSchema;
        this.tipoAjusteSchema = TipoAjusteSchema;
        this.userSchema = UserSchema;

        //#region SERVICIOS
        this.ajusteServices = new AjusteServices({ 
            ajusteModel: this.ajusteModel,
            tipoAjusteModel: this.tipoAjusteModel,
            productoModel: this.productoModel,
            usuarioModel: this.usuarioModel
        });
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
        this.compraServices = new CompraServices({
            compraModel: this.compraModel,
            detalleCompraModel: this.detalleCompraModel,
            productoModel: this.productoModel,
            proveedorModel: this.proveedorModel
        });
        this.departamentoServices = new DepartamentoServices({
            departamentoModel: this.departamentoModel,
            zodValidator: this.zodValidator,
            departamentoSchema: this.departamentoSchema
        });
        this.direccionServices = new DireccionServices({
            direccionModel: this.direccionModel,
            zodValidato: this.zodValidator,
            direccionSchema: this.direccionSchema
        });
        this.municipioServices = new MunicipioServices({
            municipioModel: this.municipioModel,
            zodValidator: this.zodValidator,
            municipioSchema: this.municipioSchema
        });
        this.pedidoServices = new PedidoServices({
            pedidoModel: this.pedidoModel,
            detallePedidoModel: this.detallePedidoModel,
            productoModel: this.productoModel,
            clienteModel: this.clienteModel
        });
        this.proveedorServices = new ProveedorServices({
            proveedorModel: this.proveedorModel,
            zodValidator: this.zodValidator,
            proveedorSchema: this.proveedorSchema
        });
        this.productoServices = new ProductoServices({
            productoModel: this.productoModel,
            zodValidator: this.zodValidator,
            productoSchema: this.productoSchema
        });
        this.rolServices = new RolServices({
            rolModel: this.rolModel,
            zodValidator: this.zodValidator,
            rolSchema: this.rolSchema
        });
        this.tipoAjusteServices = new TipoAjusteServices({
            tipoajusteModel: this.tipoAjusteModel,
            zodValidator: this.zodValidator,
            tipoAjusteSchema: this.tipoAjusteSchema
        });
        this.usuarioServices = new UsuarioServices({
            usuarioModel: this.usuarioModel,
            zodValidator: this.zodValidator,
            usuarioSchema: this.userSchema
        });
        //#endregion

        //#region CONTROLADORES
        this.ajusteController = new AjusteController({
            ajusteService: this.ajusteServices
        });
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
        this.compraController = new CompraController({
            compraService: this.compraServices
        });
        this.departamentoController = new DepartamentoController({
            departamentoServices: this.departamentoServices
        });
        this.direccionController = new DireccionController({
            direccionServices: this.direccionServices
        });
        this.municipioController = new MunicipioController({
            municipioServices: this.municipioServices
        });
        this.pedidoController = new PedidoController({
            pedidoServices: this.pedidoServices
        });
        this.productoController = new ProductoController({
            productoServices: this.productoServices
        });
        this.proveedorController = new ProveedorController({
            proveedorServices: this.proveedorServices
        });
        this.rolController = new RolController({
            rolServices: this.rolServices
        });
        this.tipoAjusteController = new TipoAjusteController({
            tipoAjusteServices: this.tipoAjusteServices
        });
        this.usuarioController = new UsuarioController({
            usuarioServices: this.usuarioServices
        });
        //#endregion
    }
}
