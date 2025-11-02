export const detallePedidoModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'detallePedido',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pedidoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'pedidos',
                    key: 'id'
                }
            },
            productoId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'productos',
                    key: 'cod_producto'
                }
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1
                }
            },
            precio: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    min: 0
                }
            },
            iva: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    min: 0
                }
            }
        },
        {
            modelName: 'detallePedido',
            tableName: 'detalle_pedido',
            paranoid: true,
            timestamps: true,
            underscored: true
        }
    );
};
