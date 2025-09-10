import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

//Definición del modelo Categoria 
const categoriaModel = sequelize.define(
    'categoria', 
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true         
        },
        categoria:{
            type:DataTypes.STRING(50),
            allowNull: false 
        },
        descripcion:{
            type:DataTypes.TEXT,
            allowNull: true
        },
    },
    {
        
        //Configuraciones adicionales
        modelName: 'categoria',
        tableName: 'categorias',
        paranoid: true, //Sirve par realizar una eliminación lógica sin borrar el registro de la base de datos
        timestamps: true, //Timesamps crea en la BD los campos: createdAt, updatedAt, deletedAt
        underscored: true //Convierte los nombres de los campos de camelCase a snake_case en la BD
});

export default categoriaModel;