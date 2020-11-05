import CaixaUnes from '../models/CaixaUnes';

class CaixaUnesController {
  // Serve para inserir registro de Ativar/Desativar pedidos:
  async create(req, res) {
    const { valor_total_em_caixa } = req.body;

    const caixa = await CaixaUnes.create({
      valor_total_em_caixa,
    });

    return res.json(caixa);
  }

  async return(req, res) {
    const caixa = await CaixaUnes.findOne();
    return res.json(caixa);
  }

  async updater(req, res) {
    const { valor_de_entrada } = req.params;

    CaixaUnes.update(
      { valor_total_em_caixa: valor_de_entrada },
      { where: { id: 1 } }
    );
    return res.json(valor_de_entrada);
  }
}

export default new CaixaUnesController();
