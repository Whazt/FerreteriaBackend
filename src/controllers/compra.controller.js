export class CompraController {
    constructor({ compraService }) {
        this.compraService = compraService;
    }

    getAll = async (req, res) => {
        try {
        const compras = await this.compraService.getAll();
        res.status(200).json(compras);
        } catch (err) {
        res.status(500).json({ error: err.message });
        }
    };

    getByProveedor = async (req, res) => {
        try {
        const { proveedorId } = req.params;
        const compras = await this.compraService.getByProveedor(proveedorId);
        res.status(200).json(compras);
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    };

    getById = async (req, res) => {
        try {
        const { id } = req.params;
        const compra = await this.compraService.getById(id);
        res.status(200).json(compra);
        } catch (err) {
        res.status(404).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
        const { proveedorId, items } = req.body;
        const compra = await this.compraService.create(proveedorId, items);
        res.status(201).json(compra);
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    };

    aplicarCompra = async (req, res) => {
        try {
        const { id } = req.params;
        const compra = await this.compraService.aplicarCompra(id);
        res.status(200).json(compra);
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    };

    delete = async (req, res) => {
        try {
        const { id } = req.params;
        const result = await this.compraService.delete(id);
        res.status(200).json(result);
        } catch (err) {
        res.status(400).json({ error: err.message });
        }
    };
}
