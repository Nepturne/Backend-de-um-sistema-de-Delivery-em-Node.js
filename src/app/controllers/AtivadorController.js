import * as Yup from 'yup';
import AtivadorPedidos from '../models/Ativador';

class AtivadorController {
  // Serve para inserir registro de Ativar/Desativar pedidos:
  async create(req, res) {
    const schema = Yup.object().shape({
      ativador: Yup.boolean().required(),
    });

    const { ativador } = await AtivadorPedidos.create(req.body);
    return res.json({ ativador });
  }

  async return(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    const ativadotrue = await AtivadorPedidos.findOne();
    return res.json(ativadotrue);
  }

  async ativar(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    const ativador = await AtivadorPedidos.update(
      {
        ativador: true,
      },
      {
        where: { id: 1 },
      }
    );

    const ativadotrue = await AtivadorPedidos.findAll();
    return res.json(ativadotrue);
  }

  async desativar(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    const ativadore = await AtivadorPedidos.update(
      {
        ativador: false,
      },
      {
        where: { id: 1 },
      }
    );

    const ativadorfalse = await AtivadorPedidos.findAll();
    return res.json(ativadorfalse);
  }

  // Serve para encontrar listar  quantos campos com registro em ativar pedidos existem:
  async indexCountAtivo(req, res) {
    const ativadors = await AtivadorPedidos.findAndCountAll();
    return res.json(ativadors);
  }
}

export default new AtivadorController();
