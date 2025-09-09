import express from 'express';
import cors from 'cors';
import { createCategoriaRouter } from './src/routes/categoria.routes.js';
import { Container } from './container.js';

const app = express();
//Evitar eroreres de CORS
app.use(cors());
//Configuraciones de express
app.disable('x-powered-by');
app.use(express.json());
//Rutas
const container = new Container();
app.use('/categorias', createCategoriaRouter({categoriaController: container.categoriaController}));

//Midlewares Globales


export default app;
