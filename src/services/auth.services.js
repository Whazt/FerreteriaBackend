import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthServices {
    constructor({ userModel , zodValidator, authSchema}) {
        this.userModel = userModel;
        this.zodValidator = zodValidator;
        this.authSchema = authSchema;
    }

    async register({ email, password }) {
        // Validar datos de entrada
        this.zodValidator.validate(this.authSchema.register, { email, password });
        // Verificar si el usuario ya existe
        const existingUser = await this.userModel.findOne({ where: { email } });
        if (existingUser) throw new Error('El usuario ya existe');
        // Hashear la contraseña
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Crear el usuario
        const newUser = await this.userModel.create({ email, contrasenaHash: hashedPassword, rolId: 2 });
        return { id: newUser.id, email: newUser.email};
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
