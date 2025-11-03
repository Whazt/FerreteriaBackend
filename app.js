import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createCategoriaRouter } from './src/routes/categoria.routes.js';
import { createAuthRouter } from './src/routes/auth.routes.js';
import { createProductoRouter } from './src/routes/producto.routes.js'
import { createAjusteRouter } from './src/routes/ajuste.routes.js'
import { createCarritoRouter } from './src/routes/carrito.routes.js'
import { createClientoRouter } from './src/routes/cliente.routes.js'
import { createCompraRouter } from './src/routes/compra.routes.js'
import { createDepartamentoRouter } from './src/routes/departamento.routes.js'
import { createDireccionRouter } from './src/routes/direccion.routes.js'
import { createMunicipioRouter} from './src/routes/municipio.routes.js'
import { createPedidoRouter } from './src/routes/pedido.routes.js'
import { createProveedorRouter } from './src/routes/proveedor.routes.js'
import { createRolRouter } from './src/routes/rol.routes.js'
import { createTipoAjusteRouter } from './src/routes/tipoajuste.routes.js'
import { createUserRouter } from './src/routes/user.routes.js'
import { Container } from './container.js';

const app = express();
//Evitar eroreres de CORS
app.use(cors());
//Configuraciones de express
app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());
//Rutas
const container = new Container();
app.use('/ajustes', createAjusteRouter({ajusteController: container.ajusteController}));
app.use('/auth', createAuthRouter({authController: container.authController})); 
app.use('/carrito', createCarritoRouter({carritoController: container.carritoController}));
app.use('/clientes', createClientoRouter({clienteController: container.clienteController}));
app.use('/compras', createCompraRouter({compraController: container.compraController}));
app.use('/categorias', createCategoriaRouter({categoriaController: container.categoriaController}));
app.use('/departamentos', createDepartamentoRouter({departamentoController: container.departamentoController}));
app.use('/municipios', createMunicipioRouter({municipioController: container.municipioController}));
app.use('/direcciones', createDireccionRouter({direccionController: container.direccionController}));
app.use('/pedidos', createPedidoRouter({pedidoController: container.pedidoController}));
app.use('/productos', createProductoRouter({productoController: container.productoController}));
app.use('/proveedores', createProveedorRouter({proveedorController: container.proveedorController}));
app.use('/roles', createRolRouter({rolController: container.rolController}));
app.use('/tipoajustes', createTipoAjusteRouter({tipoAjusteController: container.tipoAjusteController}));
app.use('/usuarios', createUserRouter({usuarioController: container.usuarioController}));
//Midlewares Globales


export default app;
