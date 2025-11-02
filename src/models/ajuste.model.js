export const ajusteModel = (sequelize, DataTypes) =>{
    return sequelize.define(
        'ajuste',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                autoincrement: true
            },
            productoId:{
                type: DataTypes.STRING,
                allowNull: false,
                references:{
                    model:'productos',
                    key: 'cod_producto'
                }
            },
            tipoAjusteId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references:{
                    model:'tipoAjuste',
                    key: 'id'
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
            observacion:{
                type:DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            //configuraciones
            modelName: 'ajuste',
            tableName: 'ajuste',
            paranoid: true,
            timestamps: true,
            underscored: true
        }
    )
}