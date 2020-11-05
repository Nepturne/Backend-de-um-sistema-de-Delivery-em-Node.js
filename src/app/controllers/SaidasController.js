import * as Yup from 'yup';
import Saidas from '../models/Saidas';
import CaixaUnes from '../models/CaixaUnes';

class SaidasController {
  async dif(req, res) {
    const { id_caixa } = req.params;
    const { data_hora_saida } = req.params;
    const { quem_fez_saida } = req.params;
    const { titulo_saida } = req.params;
    const { motivo_saida } = req.params;
    const { valor_de_saida } = req.params;
    
    const caixa = await CaixaUnes.findAll({
      attributes: ['valor_total_em_caixa'],
      where: { id: id_caixa },
    });

    var valuecaixa = JSON.stringify(caixa[0].valor_total_em_caixa);
    var valorcaixa = JSON.parse(valuecaixa);
    var saidaenviada = parseFloat(valorcaixa) - parseFloat(valor_de_saida);

    const tb_saidas = await Saidas.create({
      data_hora_saida,
      quem_fez_saida,
      titulo_saida,
      motivo_saida,
      valor_de_saida,
    });

    CaixaUnes.update(
      { valor_total_em_caixa: saidaenviada },
      { where: { id: 1 } }
    );

    return res.json({
      saidas: tb_saidas,
      valor_caixa: saidaenviada,
    });
  }
  async returnsaidas(req, res) {
    const saidas = await Saidas.findAndCountAll();
    return res.json(saidas);
  }
}

export default new SaidasController();
