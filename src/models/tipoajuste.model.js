export const tipoAjusteModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'tipoajuste', 
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true         
            },
            tipoAjuste:{
                type:DataTypes.STRING(50),
                allowNull: false 
            },
        },
        {  
            //Configuraciones adicionales
            modelName: 'tipoajuste',
            tableName: 'tipo_ajuste',
            paranoid: true, //Sirve par realizar una eliminación lógica sin borrar el registro de la base de datos
            timestamps: true, //Timesamps crea en la BD los campos: createdAt, updatedAt, deletedAt
            underscored: true //Convierte los nombres de los campos de camelCase a snake_case en la BD
        }
    );
}