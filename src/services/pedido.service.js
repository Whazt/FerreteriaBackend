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

    async create(usuarioId, data, opciones) {
        const t = await this.pedido.sequelize.transaction();
        try {
            const cliente = await this.cliente.findOne({ where: { usuarioId }, transaction: t });
            if (!cliente) throw new Error('Cliente no encontrado');

            // ... lógica de productos igual que antes ...

            const subtotal = detalles.reduce((acc,d)=> acc + (d.precio * d.cantidad),0);
            const iva = detalles.reduce((acc, d) => acc + d.iva, 0);

            // Definir gasto de envío
            const gastoEnvio = opciones.tipoEntrega === 'envio' ? 150.00 : 0.00; // ejemplo fijo, o dinámico

            const pedido = await this.pedido.create({
            clienteId: cliente.id,
            subtotal,
            iva,
            gastoEnvio,
            estado: 'pendiente',
            metodoPago: opciones.metodoPago,
            tipoEntrega: opciones.tipoEntrega
            }, { transaction: t });

            // ... insertar detalles y restar existencias ...

            await t.commit();
            return pedido;
        } catch (err) {
            await t.rollback();
            throw new Error('Error al crear el pedido: ' + err.message);
        }
    }

    async create(usuarioId, data) {
        const t = await this.pedido.sequelize.transaction();
        try {
            const cliente = await this.cliente.findOne({ where: { usuarioId }, transaction: t });
            if (!cliente) throw new Error('Cliente no encontrado');
            // Obtener productos
            const productos = await this.producto.findAll({
            where: { cod_producto: data.productos.map(item => item.productoId) },
            transaction: t
            });
            console.log(productos)
            // Mapear detalles
            const detalles = data.productos.map(item => {
            const producto = productos.find(p => p.codProducto === item.productoId);
            console.log(`cod_producto:${productos.find(p => p.cod_producto)} ====== item.productoId ${item.productoId}`)
            if (!producto) {
                console.error("Producto no encontrado:", item.productoId);
                throw new Error(`Producto${item.productoId} no encontrado`);
            }
            if (producto.existencias < item.cantidad) {
                console.error("Stock insuficiente:", producto.cod_producto, producto.existencias, item.cantidad);
                throw new Error(`Stock insuficiente para ${item.productoId}`);
            }
            const precioUnitario = parseFloat(producto.precio);
            if (isNaN(precioUnitario)) {
                console.error("Precio inválido:", producto.cod_producto, producto.precio);
                throw new Error(`Precio inválido para ${item.productoId}`);
            }
            return {
                productoId: item.productoId,
                cantidad: item.cantidad,
                precio: precioUnitario,
                iva: parseFloat((precioUnitario * item.cantidad) * 0.15)
            };
            });

            const subtotal = detalles.reduce((acc,d)=> acc + (d.precio * d.cantidad),0);
            const iva = detalles.reduce((acc, d) => acc + d.iva, 0);

            // Gasto de envío (si no viene en data, default 0)
            const gastoEnvio = data.gastoEnvio ?? (data.tipoEntrega === 'envio' ? 150.00 : 0.00);
            console.log('entra a crear el pedido')
            // Crear pedido
            const pedido = await this.pedido.create({
            clienteId: cliente.id,
            subtotal,
            iva,
            gastoEnvio,
            estado: 'pendiente',
            metodoPago: data.metodoPago,
            tipoEntrega: data.tipoEntrega
            }, { transaction: t });
            console.log('entra a insertar detalles')
            // Insertar detalles
            await this.detallePedido.bulkCreate(
            detalles.map(d => ({ ...d, pedidoId: pedido.id })),
            { transaction: t }
            );
            console.log('entra a resta existencias')
            // Restar existencias
            for (const d of detalles) {
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