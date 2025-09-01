const app = require('./src/app');

//Definición del puerto
const PORT = process.env.PORT || 4000;

//Inicialización del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://loclahost:$(PORT)`);
})