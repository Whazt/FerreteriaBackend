const swaggerAutogen = require('swagger-autogen');

const swagegrAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./server.js'); 
});