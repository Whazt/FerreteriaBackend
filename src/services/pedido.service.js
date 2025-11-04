import { Sequelize } from "sequelize";

export class PedidoServices{
    constructor({pedidoModel, detallePedidoModel, productoModel, clienteModel}){
        this.pedido = pedidoModel;
        this.detallePedido = detallePedidoModel;
        this.producto = productoModel;
        this.cliente = clienteModel;
    }

    async getAll(){
        return await this.pedido.findAll(
            { include: [{ model: this.detallePedido, as: 'detalles' }] }
        );
    }

    async getByClient(data){
        if(!data) throw new Error('el ID del Cliente es necesario')
        return await this.pedido.findAll({
            where: { clienteId: data },
            include: [{ model: this.detallePedido, as: 'detalles' }]
        });
    }

    async getById(id){
        const pedido = await this.pedido.findByPk(id, {include:[{model: this.detallePedido, as: 'detalles'}]});
        return pedido ? pedido : {message: 'Pedido No Encontrado'}
    }

    async create(usuarioId, data ){
        const t = await this.pedido.sequelize.transaction();
        try {
            //Obtener cliente
            const cliente = await this.cliente.findOne({where: { usuarioId}}, {transaction: t})
            if(!cliente) throw new Error('Cliente no encontrado');
            //Obtener productos del carrito
            const productos = await this.producto.findAll({
                where: {
                    cod_producto: data.map(item => item.productoId)
                },
                transaction: t
            });
            //Obteniendo informacion necesario de productos
            const detalles = data.map(item => {
                const producto = productos.find(p => p.codProducto === item.productoId);
                if (!producto) throw new Error(`Producto ${item.productoId} no encontrado`);
                const cantidad = item.cantidad;
                const precioUnitario = parseFloat(producto.precio);
                const existencias = producto.existencias
                if(existencias < cantidad) throw new Error(`Producto ${item.productoId} no cuenta con suficientes existencias`)
                return {
                    productoId: item.productoId,
                    cantidad,
                    precio: precioUnitario,
                    iva: parseFloat((precioUnitario * cantidad) * 0.15)
                };
            });
            //Totales de pedido
            const subtotal = detalles.reduce((acc,d)=> acc + (d.precio * d.cantidad),0);
            const iva = detalles.reduce((acc, d) => acc + d.iva, 0);
            //Creando el pedido
            const pedido = await this.pedido.create({
                clienteId: cliente.id,
                subtotal,
                iva,
                estado: 'pendiente'
            }, { transaction: t });
            //Insertando detalles
            const detallesPedido = detalles.map(d => ({
                pedidoId: pedido.id,
                productoId: d.productoId,
                cantidad: d.cantidad,
                precio: d.precio,
                iva: d.iva
            }));
            await this.detallePedido.bulkCreate(detallesPedido, { transaction: t });
            //restando existencias
            for (const d of detallesPedido) {
                await this.producto.decrement('existencias', {
                    by: d.cantidad,
                    where: { cod_producto: d.productoId },
                    transaction: t
                });
            }
            await t.commit();
            return pedido;
        } catch (err) {
            await t.rollback();
            throw new Error('Error al crear el pedido: ' + err.message);
        }
    }

    async updateEstado(id, nuevoEstado) {
        const t = await this.pedido.sequelize.transaction();
        try {
            const pedido = await this.pedido.findByPk(id, {
                include: [{ model: this.detallePedido , as: 'detalles'}],
                transaction: t
            });
            if (!pedido) throw new Error('Pedido no encontrado');
            // Si se cancela, devolver existencias
            if (nuevoEstado === 'cancelado' && pedido.estado !== 'cancelado') {
                for (const detalle of pedido.detalles) {
                    await this.producto.increment('existencias', {
                    by: detalle.cantidad,
                    where: { cod_producto: detalle.productoId },
                    transaction: t
                    });
                }
            }
            pedido.estado = nuevoEstado;
            await pedido.save({ transaction: t });
            await t.commit();
            return pedido;
        } catch (err) {
            await t.rollback();
            throw new Error('Error al actualizar estado: ' + err.message);
        }
    }

    async delete(id) {
        const t = await this.pedido.sequelize.transaction();
        try {
            const pedido = await this.pedido.findByPk(id, {
                include: [{ model: this.detallePedido, as: 'detalles' }],
                transaction: t
            });
            if (!pedido) throw new Error('Pedido no encontrado');
            // Devolver existencias
            if(!(pedido.estado === 'cancelado')){
                for (const detalle of pedido.detalles) {
                await this.producto.increment('existencias', {
                    by: detalle.cantidad,
                    where: { cod_producto: detalle.productoId },
                    transaction: t
                });
                }
            }
            await pedido.destroy({ transaction: t });
            await t.commit();
            return { message: 'Pedido eliminado y existencias restauradas' };
        } catch (err) {
            await t.rollback();
            throw new Error('Error al eliminar pedido: ' + err.message);
        }
    }

}