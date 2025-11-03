export class DepartamentoController {
    constructor({ departamentoServices }) {
        this.departamentoService = departamentoServices;
    }

    getAll = async (req, res) => {
        try {
            const departamentos = await this.departamentoService.getAll();
            res.status(200).json(departamentos);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    // Obtener un departamento por ID
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const departamento = await this.departamentoService.getById(id);
            res.status(200).json(departamento);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
            const nuevoDepartamento = await this.departamentoService.create(req.body);
            res.status(201).json(nuevoDepartamento);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    // Actualizar un departamento existente
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const actualizado = await this.departamentoService.update(id, req.body);
            res.status(200).json({ mensaje: 'Departamento actualizado correctamente', data: actualizado });
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
            await this.departamentoService.delete(id);
            res.status(200).json({ mensaje: 'Departamento eliminado correctamente' });
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}
