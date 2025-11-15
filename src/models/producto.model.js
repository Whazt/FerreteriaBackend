export const productoModel = (sequelize, DataTypes) => {
    return sequelize.define(
        'producto',
        {
            codProducto:{
                type: DataTypes.STRING(14),
                primaryKey: true,
                unique: true
            },
            producto:{
                type: DataTypes.STRING(100),
                allowNull: false
            },
            descripcion:{
                type: DataTypes.TEXT,
                allowNull: false
            },
            precio:{
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                validate:{
                    isDecimal: true,
                    min: 0.01
                }
            },
            existencias:{
                type: DataTypes.INTEGER,
                allowNull: false,
                validate:{
                    min: 0
                }
            }, 
            categoriaId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model:'categorias',
                    key:'id'
                }
            },
            costo:{
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
                validate:{
                    min: 1
                }
            },
            imagenUrl:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            existenciaMax:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            existenciaMin:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        },
        {
            //Configuraciones adicionales
            modelName: 'producto',
            tableName:'productos',
            paranoid: true,
            timestamps: true,
            underscored: true
        }
    );
}