import express from 'express';
import cors from 'cors';
import categoriaRoutes from './src/routes/categoria.routes.js';


const app = express();
//Evitar eroreres de CORS
app.use(cors());
app.use(express.json());
//Rutas

app.use('/api/categorias', categoriaRoutes);

//Midlewares Globales


export default app;
