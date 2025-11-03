export class ClienteController {
    constructor({ clienteServices }) {
        this.clienteService = clienteServices;
    }

    getAll = async (req, res) => {
        try {
            const clientes = await this.clienteService.getAll();
            res.status(200).json(clientes);
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
            const cliente = await this.clienteService.getById(id);
            res.status(200).json(cliente);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
            const nuevoCliente = await this.clienteService.create(req.body);
            res.status(201).json(nuevoCliente);
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
            const update = await this.clienteService.update(id, req.body);
            res.status(200).json({ mensaje: 'Cliente actualizado correctamente', data: update });
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
            const deleted = await this.clienteService.delete(id);
            if(!deleted) return res.status(404).json({message: 'Cliente no encontrado'});
            res.status(200).json({ message: 'cliente eliminado correctamente' });
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}