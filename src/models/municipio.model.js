export const municipioModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'municipio', 
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true         
            },
            municipio:{
                type:DataTypes.STRING(50),
                allowNull: false 
            },
            departamentoId:{
                type:DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model: 'departamento',
                    key: 'id'
                },
            },
        },
        {  
            //Configuraciones adicionales
            modelName: 'municipio',
            tableName: 'municipio',
            paranoid: true, //Sirve par realizar una eliminación lógica sin borrar el registro de la base de datos
            timestamps: true, //Timesamps crea en la BD los campos: createdAt, updatedAt, deletedAt
            underscored: true //Convierte los nombres de los campos de camelCase a snake_case en la BD
        }
    );
}