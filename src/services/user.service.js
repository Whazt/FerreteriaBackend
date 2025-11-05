import bcrypt from "bcrypt";
export class UsuarioServices{
    constructor({usuarioModel, zodValidator, usuarioSchema}){
        this.usuario = usuarioModel;
        this.validator = zodValidator;
        this.schema = usuarioSchema;
    }

    //GetAll admin
    async getAll(data){
        const parsedLimit = parseInt(data.limit); 
        const finalLimit = isNaN(parsedLimit) || parsedLimit <= 20 ? 20  
            : parsedLimit>=30 ? 30
            : parsedLimit;
        const parsedPage = parseInt(data.page);
        const finalPage = parsedPage < 1 || isNaN(parsedPage) ? 1 : parsedPage;
        const offset = (finalPage - 1) * finalLimit;
        const { count, rows } = await this.usuario.findAndCountAll({
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
            mensaje: rows.length ? undefined : 'No hay usuarios disponibles'
        };
    }
    
    async getById(id){
        const usuario = await this.usuario.findByPk(id);
        return usuario ? usuario : {message: 'Usuario No Encontrado'}
    }

    async create(data){
        const dataValid = this.validator.validate(this.schema.create, data);
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(dataValid.password, salt);
        const userData = {
                email: dataValid.email, 
                contrasenaHash: hashedPassword, 
                rolId: dataValid.rolId
            }
        return await this.usuario.create(userData);
    }

    async update(id, data) {
        const usuario = await this.usuario.findByPk(id);
        if (!usuario) throw new Error('Usuario no encontrado');
        let validatedData = this.validator.validate(this.schema.update, data);
    
        if (validatedData.password) {
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await bcrypt.hash(validatedData.password, salt);
            validatedData.contrasenaHash = hashedPassword;
            delete validatedData.password; 
        }
        return await usuario.update(validatedData);
    }

    async delete(id){
        const usuario = await this.usuario.findByPk(id);
        if(!usuario) throw new Error('Usuario no encontrado');
        return await usuario.destroy();
    }
}