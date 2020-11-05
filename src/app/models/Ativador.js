import Sequelize, { Model } from 'sequelize';

class AtivadorPedidos extends Model {
  // Método estático que inicia o nosso model sempre e recebe como param a
  // conexão com o banco de dados.
  static init(sequelize) {
    super.init(
      {
        // Aqui passamos os campos da nossa tabela.
        ativador: Sequelize.BOOLEAN,
        // Não é preciso passar o id , nem as timestamps [created_at,updated_at]
      },
      // Aqui iremos passa a conexão :
      {
        sequelize,
      }
    );

    return this;
  }
}

export default AtivadorPedidos;
