export class MunicipioController {
    constructor({ municipioServices }) {
        this.municipioService = municipioServices;
    }

    getAll = async (req, res) => {
        try {
            const municipios = await this.municipioService.getAll();
            res.status(200).json(municipios);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    // Obtener un municipio por ID
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const municipio = await this.municipioService.getById(id);
            res.status(200).json(municipio);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
            const nuevoMunicipio = await this.municipioService.create(req.body);
            res.status(201).json(nuevoMunicipio);
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };

    // Actualizar un municipio existente
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const actualizado = await this.municipioService.update(id, req.body);
            res.status(200).json({ mensaje: 'Municipio actualizado correctamente', data: actualizado });
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
            await this.municipioService.delete(id);
            res.status(200).json({ mensaje: 'Municipio eliminado correctamente' });
        } catch (err) {
            if (err.details) {
                return res.status(err.status || 400).json({ errores: err.details });
            }
            res.status(500).json({ error: err.message });
        }
    };
}
