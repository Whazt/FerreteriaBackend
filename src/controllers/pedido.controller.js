export class PedidoController {
    constructor({ pedidoServices }) {
        this.pedidoService = pedidoServices;
    }

    getAll = async (req, res) => {
        try {
            const pedidos = await this.pedidoService.getAll();
            res.status(200).json(pedidos);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    getByClient = async (req, res) => {
        try {
            const { clienteId } = req.params;
            const pedidos = await this.pedidoService.getByClient(clienteId);
            res.status(200).json(pedidos);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const pedido = await this.pedidoService.getById(id);
            res.status(200).json(pedido);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    };

    create = async (req, res) => {
        try {
            const { usuarioId, data } = req.body;
            const pedido = await this.pedidoService.create(usuarioId, data);
            res.status(201).json(pedido);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    updateEstado = async (req, res) => {
        try {
            const { id } = req.params;
            const { estado } = req.body;
            const pedido = await this.pedidoService.updateEstado(id, estado);
            res.status(200).json(pedido);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await this.pedidoService.delete(id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
}
