export class RolController {
    constructor({ rolServices }) {
        this.rolService = rolServices;
    }

    getAll = async (req, res) => {
        try {
            const roles = await this.rolService.getAll();
            res.status(200).json(roles);
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
            const rol = await this.rolService.getById(id);
            res.status(200).json(rol);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
            const nuevoRol = await this.rolService.create(req.body);
            res.status(201).json(nuevoRol);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const actualizado = await this.rolService.update(id, req.body);
            res.status(200).json({ mensaje: 'Rol actualizado correctamente', data: actualizado });
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
            await this.rolService.delete(id);
            res.status(200).json({ mensaje: 'Rol eliminado correctamente' });
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}
