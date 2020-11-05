import Sequelize, { Model } from 'sequelize';

class CaixaUnes extends Model {
  // Método estático que inicia o nosso model sempre e recebe como param a
  // conexão com o banco de dados.
  static init(sequelize) {
    super.init(
      {
        // Aqui passamos os campos da nossa tabela.
        valor_total_em_caixa: Sequelize.DOUBLE,
        // Não é preciso passar o id , nem as timestamps [created_at,updated_at]
      },
      // Aqui iremos passar a conexão :
      {
        sequelize,
      }
    );

    return this;
  }
}

export default CaixaUnes;
