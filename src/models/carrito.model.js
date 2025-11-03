
export const carritoModel = (sequelize, DataTypes) =>{
    return sequelize.define(
        'carrito',
        {
            sesionId:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            usuarioId:{
                type: DataTypes.INTEGER,
                allowNull: true,
                references:{
                    model: 'usuarios',
                    key: 'id'
                },
            },
            productoId:{
                type: DataTypes.STRING,
                allowNull: false,
                references:{
                    model:'productos',
                    key: 'cod_producto'
                }
            },
            cantidad:{
                type: DataTypes.INTEGER,
                allowNull: false,
                validate:{
                    min:1,
                    isInt: true,
                }
            },
        },
        {
            //configuraciones
            modelName: 'carrito',
            tableName: 'carrito',
            timestamps: true,
            underscored: true
        }
    )
}