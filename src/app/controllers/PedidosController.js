import * as Yup from 'yup';
import User from '../models/User';
import Pedidos from '../models/Pedidos';

class PedidosController {
  // Serve para inserir registro de Ativar/Desativar pedidos:
  async store(req, res) {
    const { id_user } = req.params;
    const {
      name,
      data_pedido,
      hora_pedido,
      local_entrega,
      quantidade_items,
      forma_pagamento,
      produtos_selecionados,
      valor_pedido,
      pedido_faturado,
    } = req.body;

    const user = await User.findByPk(id_user);

    if (!user) {
      return res
        .status(400)
        .json({ error: 'Usuário não encontrado para envio do pedido.' });
    }

    const pedido = await Pedidos.create({
      id_user,
      name,
      data_pedido,
      hora_pedido,
      local_entrega,
      quantidade_items,
      forma_pagamento,
      produtos_selecionados,
      valor_pedido,
      pedido_faturado,
    });

    return res.json(pedido);
  }

  async counter(req, res) {
    const pedidos = await Pedidos.findAndCountAll({
      where: { pedido_faturado: false },
    });
    return res.json(pedidos);
  }

  async faturados(req, res) {
    const pedidos = await Pedidos.findAndCountAll({
      where: { pedido_faturado: true },
    });
    return res.json(pedidos);
  }

  async findOne(req, res) {
    const { id_pedido } = req.params;
    const pedido = await Pedidos.findOne({
      where: { id: id_pedido },
    });
    return res.json(pedido);
  }

  async deletePedido(req,res){
    const { id_pedido } = req.params;
    const pedidodeletado = await Pedidos.destroy({
      where: { id: id_pedido },
    });
    return res.json(pedidodeletado);
  }

}

export default new PedidosController();
