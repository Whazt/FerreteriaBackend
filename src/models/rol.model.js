
//Definición del modelo Rol
export const rolModel = (sequelize, DataTypes ) => {
    return sequelize.define(
        'rol', 
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            rol:{
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            }
        },
        {
            //Configuraciones adicionales
            modelName: 'rol',
            tableName: 'roles',
            paranoid: true, //Sirve par realizar una eliminación lógica sin borrar el registro de la base de datos
            timestamps: true, //Timesamps crea en la BD los campos: createdAt, updatedAt, deletedAt
            underscored: true //Convierte los nombres de los campos de camelCase a snake_case en la BD
    });
} 
