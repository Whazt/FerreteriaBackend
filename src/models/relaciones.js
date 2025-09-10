export const Relaciones = (modelos) => {
    //Usuario <> Rol (1 a N)
    modelos.rolModel.hasMany(modelos.usuarioModel, { foreignKey: 'rolId', as: 'usuarios' });
    modelos.usuarioModel.belongsTo(modelos.rolModel, { foreignKey: 'rolId', as: 'rol' });
}