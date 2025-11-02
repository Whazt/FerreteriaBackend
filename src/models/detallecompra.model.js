export const detalleCompraModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'detalleCompra',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            compraId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'compras',
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
            precioCompra: {
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
            modelName: 'detalleCompra',
            tableName: 'detalle_compra',
            paranoid: true,
            timestamps: true,
            underscored: true
        }
    );
};
