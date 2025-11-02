export class ProveedorController {
    constructor({ proveedorServices }) {
        this.proveedorService = proveedorServices;
    }

    getAll = async (req, res) => {
        try {
            const proveedores = await this.proveedorService.getAll();
            res.status(200).json(proveedores);
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
            const proveedor = await this.proveedorService.getById(id);
            res.status(200).json(proveedor);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
            const nuevoProveedor = await this.proveedorService.create(req.body);
            res.status(201).json(nuevoProveedor);
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
            const actualizado = await this.proveedorService.update(id, req.body);
            res.status(200).json({ mensaje: 'Proveedor actualizado correctamente', data: actualizado });
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
            const deleted = await this.proveedorService.delete(id);
            if(!deleted) return res.status(404).json({message: 'Proveedor no encontrado'});
            res.status(200).json({ message: 'Proveedor eliminado correctamente' });
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}
