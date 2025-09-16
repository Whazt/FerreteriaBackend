import jwt from 'jsonwebtoken';

export class AuthController {
    constructor({ authServices }) {
        this.authServices = authServices;
    }

    async register(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.authServices.register({ email, password });
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            // console.log('Body recibido: ',req.body);
            const { email, password } = req.body;
            const { accesToken, refreshToken } = await this.authServices.login({ email, password });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // En producción debe ser true 
                sameSite: 'Strict', 
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
            });
            console.log('Access token generado:', refreshToken);
            // Enviar solo el accessToken en la respuesta
            res.status(200).json(accesToken);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async refreshToken(req, res) {
        const token = req.cookies.refreshToken;
        console.log('Refresh token recibido:', token);
        if (!token) {
            return res.status(401).json({ error: 'No se encontró el refresh token' });
        }
        try {
            const decoded = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
            const payload = { id: decoded.id, email: decoded.email, rol: decoded.rol };
            const nuevoAccessToken = this.authServices.generarAccessToken(payload);
            return res.status(200).json(nuevoAccessToken);
        } catch (error) {
            return res.status(403).json({ error: 'Refresh token inválido o expirado' });
        }
    }
}