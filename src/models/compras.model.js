export const compraModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'compra',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            proveedorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                model: 'proveedores', 
                key: 'id',
                },
            },
            subtotal: {
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
            },
            estado: {
                type: DataTypes.ENUM('registrada', 'aplicada'),
                allowNull: false,
                defaultValue: 'pendiente'
            }
        },
        {
            modelName: 'compra',
            tableName: 'compras',
            paranoid: true,
            timestamps: true,
            underscored: true,
        }
    );
};