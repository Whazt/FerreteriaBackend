export class DireccionController {
    constructor({ direccionServices }) {
        this.direccionService = direccionServices;
    }

    getAll = async (req, res) => {
        try {
            const direcciones = await this.direccionService.getAll();
            res.status(200).json(direcciones);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    // Obtener una dirección por ID
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const direccion = await this.direccionService.getById(id);
            res.status(200).json(direccion);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
            const nuevaDireccion = await this.direccionService.create(req.body);
            res.status(201).json(nuevaDireccion);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    // Actualizar una dirección existente
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const actualizada = await this.direccionService.update(id, req.body);
            res.status(200).json({ mensaje: 'Dirección actualizada correctamente', data: actualizada });
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
            await this.direccionService.delete(id);
            res.status(200).json({ mensaje: 'Dirección eliminada correctamente' });
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}
