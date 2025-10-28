import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createCategoriaRouter } from './src/routes/categoria.routes.js';
import { createAuthRouter } from './src/routes/auth.routes.js';
import { Container } from './container.js';

const app = express();
//Evitar eroreres de CORS
app.use(cors());
//Configuraciones de express
app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());
//Rutas
app.get('/', function(req,res){
    res.send('PROBANDO SI SIRVE EL LOCALHOST EN WINDOWS CON LA ACTUALIZACION')
})
const container = new Container();
app.use('/auth', createAuthRouter({authController: container.authController})); 
app.use('/categorias', createCategoriaRouter({categoriaController: container.categoriaController}));

//Midlewares Globales


export default app;
