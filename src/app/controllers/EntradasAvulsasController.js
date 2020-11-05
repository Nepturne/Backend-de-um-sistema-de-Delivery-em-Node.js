import * as Yup from 'yup';
import EntradasAvulsas from '../models/EntradasAvulsas';
import CaixaUnes from '../models/CaixaUnes';

class EntradasAvulsasController {
  async avulsa(req, res) {
    const { id_caixa } = req.params;
    const { data_hora_avulsa } = req.params;
    const { quem_fez_avulsa } = req.params;
    const { titulo_avulsa } = req.params;
    const { motivo_avulsa } = req.params;
    const { valor_de_avulsa } = req.params;

    const caixa = await CaixaUnes.findAll({
      attributes: ['valor_total_em_caixa'],
      where: { id: id_caixa },
    });

    var valuecaixa = JSON.stringify(caixa[0].valor_total_em_caixa);
    var valorcaixa = JSON.parse(valuecaixa);
    var avulsa = parseFloat(valorcaixa) + parseFloat(valor_de_avulsa);

    const tb_entradasavulsas = await EntradasAvulsas.create({
      data_hora_avulsa,
      quem_fez_avulsa,
      titulo_avulsa,
      motivo_avulsa,
      valor_de_avulsa,
    });

    CaixaUnes.update(
      { valor_total_em_caixa: avulsa },
      { where: { id: 1 } }
    );

    return res.json({
      avulsas: tb_entradasavulsas,
      valor_caixa: avulsa,
    });
  }
  async returnavulsas(req, res) {
    const avulsas = await EntradasAvulsas.findAndCountAll();
    return res.json(avulsas);
  }
}

export default new EntradasAvulsasController();
