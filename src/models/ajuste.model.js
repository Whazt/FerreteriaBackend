export const ajusteModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'ajuste',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            productoId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                model: 'productos',
                key: 'cod_producto'
                }
            },
            tipoAjusteId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'tipo_ajuste',
                    key: 'id'
                }
            },
            cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                min: 1,
                isInt: true
                }
            },
            accion: {
                type: DataTypes.ENUM('aumento', 'disminucion'),
                allowNull: false
            },
            observacion: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            usuarioId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuarios',
                    key: 'id'
                }
            }
        },
        {
            modelName: 'ajuste',
            tableName: 'ajustes',
            paranoid: true,
            timestamps: true,
            underscored: true
        }
    );
};
