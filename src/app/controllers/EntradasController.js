import * as Yup from 'yup';
import Entradas from '../models/Entradas';
import CaixaUnes from '../models/CaixaUnes';
import Pedidos from '../models/Pedidos';

class EntradasController {
  async sumFaturar(req, res) {
    const { id_caixa } = req.params;
    const { id_pedido } = req.params;
    const { data_hora_pedido } = req.params;
    const { quem_fez_entrada } = req.params;
    const { titulo_entrada } = req.params;
    const { valor_de_entrada } = req.params;

    const caixa = await CaixaUnes.findAll({
      attributes: ['valor_total_em_caixa'],
      where: { id: 1 },
    });

    var valuecaixa = JSON.stringify(caixa[0].valor_total_em_caixa);
    var valorcaixa = JSON.parse(valuecaixa);
    var parseentrada = valor_de_entrada;
    var somaenviada = parseFloat(parseentrada) + parseFloat(valorcaixa);

    const tb_entradas = await Entradas.create({
      id_pedido,
      data_hora_pedido,
      quem_fez_entrada,
      titulo_entrada,
      valor_de_entrada,
    });

    CaixaUnes.update(
      { valor_total_em_caixa: somaenviada },
      { where: { id: 1 } }
    );

    Pedidos.update({ pedido_faturado: true }, { where: { id: id_pedido } });
    
    return res.json({
      entradas: tb_entradas,
      valor_caixa: somaenviada,
    });
  }

  async returnentradas(req, res) {
    const entradas = await Entradas.findAndCountAll();
    return res.json(entradas);
  }
}

export default new EntradasController();
