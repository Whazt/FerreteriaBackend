import app from './app.js';
import sequelize from './src/config/db.js';

//Definición del puerto
const PORT = process.env.PORT || 4000;

(async () => {
    try {
        //Conexión a la base de datos y sincronizacion de modelos
        await sequelize.sync({ alter: true });
        console.log('Todos los modelos se han sincronizado correctamente.');
        
        //Inicialización del servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error);
    }   
})();

