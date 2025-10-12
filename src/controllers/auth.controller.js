import jwt from 'jsonwebtoken';

export class AuthController {
    constructor({ authServices }) {
        this.authServices = authServices;
    }

    register = async (req, res) => {
        try {
            const result = await this.authServices.register(req.body);
            res.status(201).json(result);
        }
        catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(400).json({ error: err.message });
        }
    }

    login = async (req, res) => {
        try {
            const { accesToken, refreshToken } = await this.authServices.login(req.body);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // En producción debe ser true 
                sameSite: 'Strict', 
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días CAMBIAR A 30 DIAS
            });

            // Enviar solo el accessToken en la respuesta
            res.status(200).json(accesToken);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(400).json({ error: err.message });
        }
    }

    refreshToken = async (req, res) => {
        try {
            const token = req.cookies.refreshToken;
            const accesToken = await this.authServices.refreshAccesToken(token);
            return res.status(200).json(accesToken);
        } catch (error) {            
            return res.status(403).json({ error: error.message });
        }
    }

    logout (req, res){
        try {
            res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
            });
            res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}