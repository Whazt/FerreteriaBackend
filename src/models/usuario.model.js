

//Definición del modelo Usuario 
export const usuarioModel = (sequelize, DataTypes) => {
    return  sequelize.define(
        'usuario',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email:{ 
                type:DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate:{
                    isEmail: {msg: "El email no es válido"}
                }
            },
            contrasenaHash:{
                type:DataTypes.STRING,
                allowNull: false
            },
            rolId:{
                type:DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model: 'roles',
                    key: 'id'   
                } 
            },
        },
        {
            //Configuraciones adicionales
            modelName: 'usuario',
            tableName: 'usuarios',
            paranoid: true, //Sirve par realizar una eliminación lógica sin borrar el registro de la base de datos
            timestamps: true, //Timesamps crea en la BD los campos: createdAt, updatedAt, deletedAt
            underscored: true, //Convierte los nombres de los campos de camelCase a snake_case en la BD
            defaultScope: {
                attributes: { exclude: ['contrasenaHash'] } // Oculta el hash por defecto
            }
    });
}
