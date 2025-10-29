
export const carritoModel = ({sequelize, DataTypes}) =>{
    return sequelize.define(
        'carrito',
        {
            sesionID:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            productoId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model:'productos',
                    key: 'codProducto'
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