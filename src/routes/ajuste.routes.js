export class AjusteController {
    constructor({ ajusteService }) {
        this.ajusteService = ajusteService;
    }

    getAll = async (req, res) => {
        try {
        const ajustes = await this.ajusteService.getAll();
        res.status(200).json(ajustes);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    };

    getByProducto = async (req, res) => {
        try {
        const { productoId } = req.params;
        const ajustes = await this.ajusteService.getByProducto(productoId);
        res.status(200).json(ajustes);
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
        const ajuste = await this.ajusteService.create(req.body);
        res.status(201).json(ajuste);
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    };

    delete = async (req, res) => {
        try {
        const { id } = req.params;
        const result = await this.ajusteService.delete(id);
        res.status(200).json(result);
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    };
}
