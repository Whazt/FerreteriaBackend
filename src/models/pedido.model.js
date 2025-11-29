export const pedidoModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'pedido',
        {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        clienteId: { type: DataTypes.INTEGER, allowNull: false },
        subtotal: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        iva: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        gastoEnvio: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 0.00,
            validate: { min: 0 }
        },
        estado: {
            type: DataTypes.ENUM('pendiente','pagado','enviado','cancelado'),
            allowNull: false,
            defaultValue: 'pendiente'
        },
        metodoPago: {
            type: DataTypes.ENUM('efectivo_local','efectivo_contra_entrega'),
            allowNull: false,
            defaultValue: "efectivo_local"
        },
        tipoEntrega: {
            type: DataTypes.ENUM('retiro_sucursal','envio'),
            allowNull: false,
            defaultValue: "retiro_sucursal"
        }
        },
        { tableName: 'pedidos', timestamps: true, underscored: true }
    );
};
