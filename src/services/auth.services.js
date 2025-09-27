import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthServices {
    constructor({ userModel , zodValidator, authSchema, clienteModel}) {
        this.user = userModel;
        this.validator = zodValidator;
        this.schema = authSchema;
        this.cliente = clienteModel;
    }

    async register( data ) {
        // Validar datos de entrada
        const dataValid = this.validator.validate(this.schema.register, data);
        // Verificar si el usuario ya existe
        const existingUser = await this.user.findOne({ where: { email : dataValid.email } });
        if (existingUser) throw new Error('El correo ya se encuentra en uso');
        // Hashear la contraseña
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(dataValid.password, salt);
        //Iniciar Transaction por si no se crea uno de los dos registros
        const transaction = await this.user.sequelize.transaction();
        try{
            //Creación de Usuario y Cliente
            const userData = {
                email: dataValid.email, 
                contrasenaHash: hashedPassword, 
                olId: 2
            }
            const newUser = await this.user.create(userData,{ transaction });
            const customerData = {
                nombres: dataValid.nombres, 
                apellidos: dataValid.apellidos, 
                telefono: dataValid.telefono, 
                usuarioId: newUser.id
            }
            const newCustomer = await this.cliente.create( customerData, { transaction });
            await transaction.commit();
            return { id: newUser.id, nombres: newCustomer.nombres, apellidos: newCustomer.apellidos};
        }catch(error){
            console.log('entra a rollback');
            await transaction.rollback();
            throw error;
        }
    }
    
    //Metodos para generar Tokens
    generarAccessToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
    }
    
    generarRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }
    
    async login( data ) {
        // Validar datos de entrada
        const dataValid = this.validator.validate(this.schema.login, data );
        // Buscar usuario por email
        const user = await this.user.findOne({where: { email: dataValid.email }});
        if (!user) throw new Error('Usuario no encontrado');
        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(dataValid.password, user.contrasenaHash);
        if (!isPasswordValid) throw new Error('Contraseña incorrecta');
        // Generar token JWT
        const payload = { id: user.id, email: user.email, rol: user.rolId };
        const accesToken = this.generarAccessToken(payload);
        const refreshToken = this.generarRefreshToken(payload);
        // Retornar tokens
        return { accesToken , refreshToken };
    }

    async refreshAccesToken (refreshToken){
        if(!refreshToken) throw new Error('No se recibio ningún Token');
        let payload;
        try{
            payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        }catch(error){
            throw new Error('Token inválido o expirado')
        }
        const user = await this.user.findByPk(payload.id);
        if(!user) throw new Error('Usuario no Encontrado');
        const newAccesToken = this.generarAccessToken({
            id: user.id,
            email: user.email,
            rol: user.rolId
        });
        return {accesToken: newAccesToken};
    }
}
