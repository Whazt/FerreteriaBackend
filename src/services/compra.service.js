export class CompraServices {
    constructor({ compraModel, detalleCompraModel, productoModel, proveedorModel }) {
        this.compra = compraModel;
        this.detalleCompra = detalleCompraModel;
        this.producto = productoModel;
        this.proveedor = proveedorModel;
    }

    async getAll() {
        return await this.compra.findAll({
        include: [{ model: this.detalleCompra, as: 'detalles' }]
        });
    }

    async getByProveedor(proveedorId) {
        if (!proveedorId) throw new Error('El ID del proveedor es obligatorio');
        return await this.compra.findAll({
        where: { proveedorId },
        include: [{ model: this.detalleCompra, as: 'detalles' }]
        });
    }

    async getById(id) {
        const compra = await this.compra.findByPk(id, {
        include: [{ model: this.detalleCompra, as: 'detalles' }]
        });
        return compra || { message: 'Compra no encontrada' };
    }
    async create(proveedorId, data) {
        const t = await this.compra.sequelize.transaction();
        try {
            const proveedor = await this.proveedor.findOne({ where: { id: proveedorId } }, { transaction: t });

            if (!proveedor) throw new Error('Proveedor no encontrado');
            const productos = await this.producto.findAll({
                where: { cod_producto: data.map(i => i.productoId) },
                transaction: t
            });
            const detalles = data.map(item => {
                const producto = productos.find(p => p.codProducto === item.productoId);
                if (!producto) throw new Error(`Producto ${item.productoId} no encontrado`);
                const cantidad = item.cantidad;
                const precio = parseFloat(item.precio);
                return {
                    productoId: item.productoId,
                    cantidad,
                    precio,
                    iva: parseFloat((precio * cantidad) * 0.15)
                };
            });
            const subtotal = detalles.reduce((acc, d) => acc + (d.precio * d.cantidad), 0);
            const iva = detalles.reduce((acc, d) => acc + d.iva, 0);
            const compra = await this.compra.create({
                proveedorId: proveedor.id,
                subtotal,
                iva,
                estado: 'registrada'
                }, { transaction: t  
            });

            const detallesCompra = detalles.map(d => ({
                compraId: compra.id,
                productoId: d.productoId,
                cantidad: d.cantidad,
                precioCompra: d.precio,
                iva: d.iva
            }));

            await this.detalleCompra.bulkCreate(detallesCompra, { transaction: t });
            await t.commit();
            return compra;
        } catch (err) {
            await t.rollback();
            throw new Error('Error al registrar la compra: ' + err.message);
        }
    }

 
    async aplicarCompra(id) {
        const t = await this.compra.sequelize.transaction();
        try {
            const compra = await this.compra.findByPk(id, {
            include: [{ model: this.detalleCompra, as: 'detalles' }],
            transaction: t
            });
            if (!compra) throw new Error('Compra no encontrada');
            if (compra.estado === 'aplicada') throw new Error('La compra ya fue aplicada');
            for (const detalle of compra.detalles) {
            const producto = await this.producto.findOne({
                where: { cod_producto: detalle.productoId },
                transaction: t
            });
            // Cálculo prorrateado del nuevo costo
            const existenciasPrevias = parseFloat(producto.existencias);
            const costoPrevio = parseFloat(producto.costo || 0);
            const cantidadNueva = detalle.cantidad;
            const costoNuevo = parseFloat(detalle.precio);
            const totalExistencias = existenciasPrevias + cantidadNueva;
            const nuevoCosto = ((existenciasPrevias * costoPrevio) + (cantidadNueva * costoNuevo)) / totalExistencias;
            // Actualizar existencias y costo
            await producto.update({
                existencias: totalExistencias,
                costo: nuevoCosto
            }, { transaction: t });
            }
            compra.estado = 'aplicada';
            await compra.save({ transaction: t });
            await t.commit();
            return compra;
        } catch (err) {
            await t.rollback();
            throw new Error('Error al aplicar la compra: ' + err.message);
        }
    }

    async delete(id) {
        const t = await this.compra.sequelize.transaction();
        try {
            const compra = await this.compra.findByPk(id, {
            include: [{ model: this.detalleCompra, as: 'detalles' }],
            transaction: t
            });
            if (!compra) throw new Error('Compra no encontrada');

            // Solo revertir si fue aplicada
            if (compra.estado === 'aplicada') {
            for (const detalle of compra.detalles) {
                const producto = await this.producto.findOne({
                where: { cod_producto: detalle.productoId },
                transaction: t
                });

                const existenciasActuales = parseFloat(producto.existencias);
                const costoActual = parseFloat(producto.costo || 0);
                const cantidadRestar = detalle.cantidad;
                const costoCompra = parseFloat(detalle.precio);

                const existenciasPrevias = existenciasActuales - cantidadRestar;

                if (existenciasPrevias < 0) {
                throw new Error(`No se puede revertir la compra: existencias insuficientes para ${detalle.productoId}`);
                }

                // Recalcular costo por prorrateo inverso
                const nuevoCosto = existenciasPrevias > 0
                ? ((existenciasActuales * costoActual) - (cantidadRestar * costoCompra)) / existenciasPrevias
                : 0;

                await producto.update({
                existencias: existenciasPrevias,
                costo: nuevoCosto
                }, { transaction: t });
            }
            }

            await compra.destroy({ transaction: t });
            await t.commit();
            return { message: 'Compra eliminada, existencias y costo revertidos' };
        } catch (err) {
            await t.rollback();
            throw new Error('Error al eliminar la compra: ' + err.message);
        }
    }
}
