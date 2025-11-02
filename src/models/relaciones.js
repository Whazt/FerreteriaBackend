export const Relaciones = (modelos) => {
    //Rol muchos usuarios y Usuario pertence a un rol
    modelos.rolModel.hasMany(modelos.usuarioModel, { foreignKey: 'rolId', as: 'usuarios' });
    modelos.usuarioModel.belongsTo(modelos.rolModel, { foreignKey: 'rolId', as: 'rol' });
    // Cliente pertenece a un usuario y Usuario tiene un único cliente
    modelos.clienteModel.belongsTo(modelos.usuarioModel, { foreignKey: 'usuarioId',as: 'usuario'});
    modelos.usuarioModel.hasOne(modelos.clienteModel, { foreignKey: 'usuarioId',as: 'cliente'});
    //Producto tiene muchos carritos y Cada línea del carrito pertenece a un producto
    modelos.productoModel.hasMany(modelos.carritoModel, { foreignKey: 'productoId', sourceKey:'codProducto',as: 'carritos' });
    modelos.carritoModel.belongsTo(modelos.productoModel, { foreignKey: 'productoId', targetKey:'codProducto', as: 'producto' });
    ///Categoria tiene muchos productos y Productos pertence a una categoria
    modelos.categoriaModel.hasMany(modelos.productoModel, { foreignKey: 'categoriaId', as: 'productos' });
    modelos.carritoModel.belongsTo(modelos.productoModel, { foreignKey: 'categoriaId', as: 'categoria' });
    //Pedido y detallepedido
    modelos.pedidoModel.hasMany(modelos.detallePedidoModel, { foreignKey: 'pedidoId', as: 'detalles' });
    modelos.detallePedidoModel.belongsTo(modelos.pedidoModel, { foreignKey: 'pedidoId', as: 'pedido' });
    modelos.detallePedidoModel.belongsTo(modelos.productoModel, { foreignKey: 'productoId', as: 'producto' });
    modelos.pedidoModel.belongsTo(modelos.clienteModel, {foreignKey: 'clienteId', as: 'cliente'});
    modelos.clienteModel.hasMany(modelos.pedidoModel, {foreignKey: 'clienteId', as: 'pedidos'});
    //compras proveedores
    modelos.compraModel.belongsTo(modelos.proveedorModel, {foreignKey: 'proveedorId', as: 'proveedor'});
    modelos.proveedorModel.hasMany(modelos.compraModel, {foreignKey: 'proveedorId', as: 'compras'});
}