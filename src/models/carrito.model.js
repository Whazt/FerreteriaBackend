import { id } from "zod/locales"

export const carritoModel = ({sequelize, DataTypes}) =>{
    return sequelize.define(
        'carrito',
        {
            usuarioID:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model:'usuarios',
                    key: 'id'
                }
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
                    min:1
                }
            }
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