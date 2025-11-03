export class CarritoServices {
    constructor({ carritoModel, productoModel, zodValidator, carritoSchema }) {
        this.carrito = carritoModel;
        this.producto = productoModel;
        this.validator = zodValidator;
        this.schema = carritoSchema;
    }

    async getCarritoBySesion(sesionId) {
        return await this.carrito.findAll({
        where: { sesionId },
        include: [{ model: this.producto }]
        });
    }

    async agregarProducto({ data }) {
        const validatedData = this.validator.validate(this.schema.ajustar, data);
        const { sesionId, productoId, cantidad } = validatedData;
        const producto = await this.producto.findByPk(productoId);
        if (!producto) throw new Error('Producto no existe');
        const existente = await this.carrito.findOne({
            where: { sesionId, productoId }
        });
        const cantidadFinal = (existente?.cantidad || 0) + cantidad;
        if (cantidadFinal > producto.stock) {
            throw new Error(`Stock insuficiente. Máximo permitido: ${producto.stock}`);
        }
        if (existente) {
            existente.cantidad = cantidadFinal;
            return await existente.save();
        }
        return await this.carrito.create({ sesionId, productoId, cantidad });
    }

    async ajustarCantidad({ data }) {
        const validatedData = this.validator.validate(this.schema.ajustar, data);
        const { sesionId, productoId, operacion } = validatedData;
        const item = await this.carrito.findOne({ where: { sesionId, productoId } });
        if (!item) throw new Error('Producto no está en el carrito');
        const producto = await this.producto.findByPk(productoId);
        if (!producto) throw new Error('Producto no existe');
        if (operacion === 'sumar') {
            if (item.cantidad + 1 > producto.stock) {
            throw new Error(`Stock insuficiente. Máximo permitido: ${producto.stock}`);
            }
            item.cantidad += 1;
            return await item.save();
        }
        if (operacion === 'restar') {
            if (item.cantidad - 1 <= 0) {
            await item.destroy();
            return { eliminado: true };
            }
            item.cantidad -= 1;
            return await item.save();
        }
        throw new Error('Operación inválida');
    }

    async eliminarProducto({ data }) {
        const { sesionId, productoId } = data;
        return await this.carrito.destroy({ where: { sesionId, productoId } });
    }

    async limpiarCarrito(sesionId) {
        return await this.carrito.destroy({ where: { sesionId } });
    }

    async calcularTotal(sesionId) {
        const items = await this.getCarritoBySesion(sesionId);
        return items.reduce((total, item) => {
        const precio = item.producto?.precio || 0;
        return total + precio * item.cantidad;
        }, 0);
    }
}
