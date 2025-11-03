export const direccionModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'direccion',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            direccion: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            referencias: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            cliente_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model: 'clientes',
                    key: 'id'
                },
            },
            municipio_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model: 'municipio',
                    key: 'id'
                },
            },
            por_defecto: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            modelName: 'direccion',
            tableName: 'direccion',
            paranoid: true, // eliminación lógica
            timestamps: true, // crea created_at, updated_at, deleted_at
            underscored: true // usa snake_case en BD
        }
    );
};