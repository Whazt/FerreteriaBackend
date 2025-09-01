const swaggerAutogen = require('swagger-autogen');

const swagegrAutogen = require('swagger-autogen')();

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./server.js'); 
});