//Definicion del Modelo Cliente

export const clienteModel  = (sequelize , DataTypes) => {
    return sequelize.define(
        'cliente',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombres:{
                type: DataTypes.STRING(50),
                allownull: false,
            },
            apellidos:{
                type: DataTypes.STRING(50),
                allownull: false,
            },
            telefono:{
                type: DataTypes.CHAR(8),
                unique: true,
                allownull: false
            },
            usuarioId:{
                type: DataTypes.INTEGER,
                allownull: false,
                references:{
                    model: 'usuarios',
                    key: 'id'
                },
                unique: true
            }
        },
        {
            //configuraciones adicionales
            modelName: 'cliente',
            tableName: 'clientes',
            paranoid: true,//Eliminacion Lógica
            tiemstamps: true,//Campos createdAt,DeletedAt,UpdatedAt
            underscored: true//Crea campos en la bd snake_case
        }
    );
}