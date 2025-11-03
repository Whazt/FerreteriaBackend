export class AjusteService {
    constructor({ ajusteModel, productoModel, tipoAjusteModel, usuarioModel}) {
        this.ajuste = ajusteModel;
        this.producto = productoModel;
        this.tipoAjuste = tipoAjusteModel;
        this.usuario = usuarioModel;
    }

    async getAll() {
        return await this.ajuste.findAll({
        include: [
            { model: this.producto, as: 'producto' },
            { model: this.tipoAjuste, as: 'tipoAjuste' },
            { model: this.usuario, as: 'usuario' }
        ]
        });
    }

    async getByProducto(productoId) {
        return await this.ajuste.findAll({
        where: { productoId },
        include: [
            { model: this.tipoAjuste, as: 'tipoAjuste' },
            { model: this.usuario, as: 'usuario' }
        ]
        });
    }

    async create(data) {
        const t = await this.ajuste.sequelize.transaction();
        try {
        this.validator.parse(this.schema, data);

        const producto = await this.producto.findOne({
            where: { cod_producto: data.productoId },
            transaction: t
        });
        if (!producto) throw new Error('Producto no encontrado');

        const existencias = parseInt(producto.existencias);
        const cantidad = parseInt(data.cantidad);

        if (data.accion === 'disminucion' && existencias < cantidad) {
            throw new Error(`Stock insuficiente para ajuste: disponible ${existencias}, solicitado ${cantidad}`);
        }

        const nuevoStock = data.accion === 'aumento'
            ? existencias + cantidad
            : existencias - cantidad;

        await producto.update({ existencias: nuevoStock }, { transaction: t });

        const ajuste = await this.ajuste.create(data, { transaction: t });
        await t.commit();
        return ajuste;
        } catch (err) {
        await t.rollback();
        throw new Error('Error al registrar el ajuste: ' + err.message);
        }
    }

    async delete(id) {
        const t = await this.ajuste.sequelize.transaction();
        try {
        const ajuste = await this.ajuste.findByPk(id, { transaction: t });
        if (!ajuste) throw new Error('Ajuste no encontrado');

        const producto = await this.producto.findOne({
            where: { cod_producto: ajuste.productoId },
            transaction: t
        });
        if (!producto) throw new Error('Producto no encontrado');

        const existencias = parseInt(producto.existencias);
        const cantidad = parseInt(ajuste.cantidad);

        const nuevoStock = ajuste.accion === 'aumento'
            ? existencias - cantidad
            : existencias + cantidad;

        if (nuevoStock < 0) {
            throw new Error(`No se puede revertir el ajuste: stock negativo para ${ajuste.productoId}`);
        }

        await producto.update({ existencias: nuevoStock }, { transaction: t });
        await ajuste.destroy({ transaction: t });

        await t.commit();
        return { message: 'Ajuste eliminado y existencias revertidas' };
        } catch (err) {
        await t.rollback();
        throw new Error('Error al eliminar el ajuste: ' + err.message);
        }
    }
}
