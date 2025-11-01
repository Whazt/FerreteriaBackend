
export const carritoModel = (sequelize, DataTypes) =>{
    return sequelize.define(
        'carrito',
        {
            sesionID:{
                type: DataTypes.STRING,
                allowNull: false,
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