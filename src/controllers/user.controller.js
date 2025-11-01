export class UsuarioController {
    constructor({ usuarioServices }) {
        this.usuarioService = usuarioServices;
    }

    // Obtener todos los usuarios (con paginación)
    getAll = async (req, res) => {
        try {
            const usuarios = await this.usuarioService.getAll(req.query);
            res.status(200).json(usuarios);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await this.usuarioService.getById(id);
            res.status(200).json(usuario);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
            const nuevoUsuario = await this.usuarioService.create(req.body);
            res.status(201).json(nuevoUsuario);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    // Actualizar un usuario existente
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const actualizado = await this.usuarioService.update(id, req.body);
            res.status(200).json({ mensaje: 'Usuario actualizado correctamente', data: actualizado });
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await this.usuarioService.delete(id);
            res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}
