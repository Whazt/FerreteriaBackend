//Definicion del Modelo Proveedor

export const proveedorModel  = (sequelize , DataTypes) => {
    return sequelize.define(
        'proveedor',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre:{
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            telefono:{
                type: DataTypes.CHAR(8),
                unique: true,
                allowNull: false
            },
            email:{ 
                type:DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                validate:{
                    isEmail: {msg: "El email no es válido"}
                }
            },
        },
        {
            //configuraciones adicionales
            modelName: 'proveedor',
            tableName: 'proveedores',
            paranoid: true,//Eliminacion Lógica
            tiemstamps: true,//Campos createdAt,DeletedAt,UpdatedAt
            underscored: true//Crea campos en la bd snake_case
        }
    );
}