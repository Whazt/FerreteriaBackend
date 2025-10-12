export class ProductoService{
    constructor({productoModel, zodValidator, productoSchema}){
        this.producto = productoModel,
        this.validator = zodValidator,
        this.schema = productoSchema
    }

    //Metodo para vizualizacion del cliente
    async getAll(data) {
        const parsedLimit = parseInt(data.limit); 
        const finalLimit = isNaN(parsedLimit) || parsedLimit <= 20 ? 20  
            : parsedLimit>=30 ? 30
            : parsedLimit;
        const parsedPage = parseInt(data.page);
        const finalPage = parsedPage < 1 || isNaN(parsedPage) ? 1 : parsedPage;
        const offset = (finalPage - 1) * finalLimit;
        const { count, rows } = await this.producto.findAndCountAll({
            offset,
            limit: finalLimit,
            //Para agregar filtros
            //order: [['createdAt', 'DESC']],
            // where: {...}
        });
        return {
            data: rows,
            meta: {
                total: count,
                page: finalPage,
                limit: finalLimit,
                totalPages: Math.ceil(count / finalLimit),
                hasNext: finalPage * finalLimit < count
            },
            mensaje: rows.length ? undefined : 'No hay productos disponibles'
        };
    }

    async getById(id){
        const producto = await this.producto.findById(id);
        return producto ? producto : {message: 'Producto No Encontrado'}
    }
}
