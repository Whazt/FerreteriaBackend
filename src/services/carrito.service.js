export class CarritoServices {
    constructor({ carritoModel, productoModel, zodValidator, carritoSchema }) {
        this.carrito = carritoModel;
        this.producto = productoModel;
        this.validator = zodValidator;
        this.schema = carritoSchema;
    }

    // Obtener carrito del usuario
    async getCarritoByUsuario(usuarioId) {
        if (!usuarioId) throw new Error('usuarioId es requerido');
        return await this.carrito.findAll({
            where: { usuarioId },
            include: [{ model: this.producto, as: 'producto' }]
        });
    }

    // Agregar Productos al carrito
    async agregarProducto({ data }) {
        const { usuarioId, productoId, cantidad } = data;
        if (!usuarioId) throw new Error("usuarioId es requerido");

        const producto = await this.producto.findByPk(productoId);
        if (!producto) throw new Error("Producto no existe");

        const existente = await this.carrito.findOne({
            where: { usuarioId, productoId },
        });

        const cantidadFinal = (existente?.cantidad || 0) + cantidad;
        if (cantidadFinal > producto.existencias) {
            throw new Error(`Stock insuficiente. Máximo permitido: ${producto.existencias}`);
        }

        let registro;
        if (existente) {
            existente.cantidad = cantidadFinal;
            registro = await existente.save();
        } else {
            registro = await this.carrito.create({ usuarioId, productoId, cantidad });
        }

        // 🔹 Traemos el registro actualizado con el producto incluido
        const conProducto = await this.carrito.findOne({
            where: { id: registro.id },
            include: [{ model: this.producto, as: "producto" }],
        });

        return conProducto;
    }


    // Ajustar cantidad (sumar/restar)
    async ajustarCantidad({ data }) {
        const { usuarioId, productoId, operacion } = data;
        if (!usuarioId) throw new Error("usuarioId es requerido");

        const item = await this.carrito.findOne({ where: { usuarioId, productoId } });
        if (!item) throw new Error("Producto no está en el carrito");

        const producto = await this.producto.findByPk(productoId);
        if (!producto) throw new Error("Producto no existe");

        if (operacion === "sumar") {
            if (item.cantidad + 1 > producto.stock) {
            throw new Error(`Stock insuficiente. Máximo permitido: ${producto.stock}`);
            }
            item.cantidad += 1;
            await item.save();
        } else if (operacion === "restar") {
            if (item.cantidad - 1 <= 0) {
            await item.destroy();
            return { eliminado: true, productoId };
            }
            item.cantidad -= 1;
            await item.save();
        } else {
            throw new Error("Operación inválida");
        }

        // 🔹 Devolver solo el item actualizado con producto incluido
        return await this.carrito.findOne({
            where: { usuarioId, productoId },
            include: [{ model: this.producto, as: "producto" }],
        });
    }



    // Eliminar producto
    async eliminarProducto({ data }) {
        const { usuarioId, productoId } = data;
        if (!usuarioId) throw new Error('usuarioId es requerido');
        return await this.carrito.destroy({ where: { usuarioId, productoId } });
    }

    // Limpiar todo el carrito
    async limpiarCarrito(usuarioId) {
        if (!usuarioId) throw new Error('usuarioId es requerido');
        return await this.carrito.destroy({ where: { usuarioId } });
    }

    // Calcular total del carrito
    async calcularTotal(usuarioId) {
        const items = await this.getCarritoByUsuario(usuarioId);
        return items.reduce((total, item) => {
            const precio = item.producto?.precio || 0;
            return total + precio * item.cantidad;
        }, 0);
    }

    // Crear o fusionar carrito al iniciar sesión
    async crearCarritoOnLogin({ usuarioId, items }) {
        if (!usuarioId) throw new Error("usuarioId es requerido");
        if (!Array.isArray(items)) throw new Error("Formato de items inválido");

        for (const item of items) {
            const { productoId, cantidad } = item;
            const producto = await this.producto.findByPk(productoId);
            if (!producto) continue; // o lanzar error si prefieres

            const existente = await this.carrito.findOne({
            where: { usuarioId, productoId },
            });

            const cantidadFinal = (existente?.cantidad || 0) + cantidad;
            if (cantidadFinal > producto.stock) {
            throw new Error(
                `Stock insuficiente para ${producto.nombre}. Máximo: ${producto.stock}`
            );
            }

            if (existente) {
            existente.cantidad = cantidadFinal;
            await existente.save();
            } else {
            await this.carrito.create({ usuarioId, productoId, cantidad });
            }
        }

        // 🔹 Al final devolvemos el carrito completo con productos incluidos
        return await this.carrito.findAll({
            where: { usuarioId },
            include: [{ model: this.producto, as: "producto" }],
        });
    }

}

