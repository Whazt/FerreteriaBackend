const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

//Conección a la base de datos
connectDB();

//Evitar eroreres de CORS
app.use(cors());
app.use(express.json());

//Rutas

//Midlewares Globales

//swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
modules.exports = app;
