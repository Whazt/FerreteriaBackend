import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createCategoriaRouter } from './src/routes/categoria.routes.js';
import { createAuthRouter } from './src/routes/auth.routes.js';
import { createProductoRouter } from './src/routes/producto.routes.js'
import { createAjusteRouter } from './src/routes/ajuste.routes.js'
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
app.use('/ajustes', createAjusteRouter({ajusteController: container.ajusteController}))
app.use('/auth', createAuthRouter({authController: container.authController})); 
app.use('/categorias', createCategoriaRouter({categoriaController: container.categoriaController}));
app.use('/productos', createProductoRouter({productoController: container.productoController}))

//Midlewares Globales


export default app;
