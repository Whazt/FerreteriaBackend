export const pedidoModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'pedido',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            clienteId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                model: 'clientes', 
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
                type: DataTypes.ENUM('pendiente', 'pagado', 'enviado', 'cancelado'),
                allowNull: false,
                defaultValue: 'pendiente'
            }
        },
        {
            modelName: 'pedido',
            tableName: 'pedidos',
            paranoid: true,
            timestamps: true,
            underscored: true,
        }
    );
};