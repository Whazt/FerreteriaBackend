import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        // Leer el encabezado Authorization: "Bearer <token>"
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token no proporcionado" });
        }

        const token = authHeader.split(" ")[1];

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Agregar datos del usuario al request
        req.user = {
        id: decoded.id,
        email: decoded.email,
        rol: decoded.rol,
        };

        next(); // continuar al controlador
    } catch (error) {
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
};
