export class TipoAjusteController {
    constructor({ tipoAjusteServices }) {
        this.tipoAjusteService = tipoAjusteServices;
    }

    getAll = async (req, res) => {
        try {
            const tipos = await this.tipoAjusteService.getAll();
            res.status(200).json(tipos);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    // Obtener un tipo de ajuste por ID
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const tipo = await this.tipoAjusteService.getById(id);
            res.status(200).json(tipo);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
            console.log('llega controller')
            const nuevoTipo = await this.tipoAjusteService.create(req.body);
            res.status(201).json(nuevoTipo);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    // Actualizar un tipo de ajuste existente
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const actualizado = await this.tipoAjusteService.update(id, req.body);
            res.status(200).json({ mensaje: 'Tipo de Ajuste actualizado correctamente', data: actualizado });
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
            await this.tipoAjusteService.delete(id);
            res.status(200).json({ mensaje: 'Tipo de Ajuste eliminado correctamente' });
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}
