import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Transaction } from "sequelize";

export class AuthServices {
    constructor({ userModel , zodValidator, authSchema, clienteModel}) {
        this.userModel = userModel;
        this.zodValidator = zodValidator;
        this.authSchema = authSchema;
        this.clienteModel = clienteModel;
    }

    async register({ email, password, nombres, apellidos, telefono }) {
        // Validar datos de entrada
        this.zodValidator.validate(this.authSchema.register, { email, password });
        // Verificar si el usuario ya existe
        const existingUser = await this.userModel.findOne({ where: { email } });
        if (existingUser) throw new Error('El correo ya se encuentra en uso');
        // Hashear la contraseña
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);
        //Iniciar Transaction por si no se crea uno de los dos registros
        const transaction = await this.userModel.sequelize.transaction();
        try{
            //Creación de Usuario y Cliente
            const newUser = await this.userModel.create(
                { email, contrasenaHash: hashedPassword, rolId: 2 },
                { transaction }
            );
            const newCustomer = await this.clienteModel.create(
                {nombres, apellidos, telefono, usuarioId: newUser.id},
                { transaction }
            );
            console.log('entra a commit');
            await transaction.commit();
            console.log('hecho');
            return { id: newUser.id, nombres: newCustomer.nombres, apellidos: newCustomer.apellidos};
        }catch(error){
            console.log('entra a rollback');
            await transaction.rollback();

            throw error;
        }
    }

    
    generarAccessToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
    }

    generarRefreshToken(payload) {
        console.log('Generando refresh token con payload:', process.env.REFRESH_TOKEN_SECRET);
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }
    
    async login({ email, password  }) {
        // Validar datos de entrada
        this.zodValidator.validate(this.authSchema.login, { email, password });
        // Buscar usuario por email
        const user = await this.userModel.findOne({where: { email }});
        if (!user) throw new Error('Usuario no encontrado');
        // Verificar contraseña
        // console.log('password:', password);
        // console.log('user.contrasenaHash:', user.contrasenaHash);
        const isPasswordValid = await bcrypt.compare(password, user.contrasenaHash);
        if (!isPasswordValid) throw new Error('Contraseña incorrecta');
        // Generar token JWT
        const payload = { id: user.id, email: user.email, rol: user.rolId };
        const accesToken = this.generarAccessToken(payload);
        const refreshToken = this.generarRefreshToken(payload);
        // const refreshToken = this.generarRefreshToken(payload);
        // Retornar tokens
        return { accesToken , refreshToken };
    }

}
