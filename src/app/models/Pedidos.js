import Sequelize, { Model } from 'sequelize';

class Pedidos extends Model {
  // Método estático que inicia o nosso model sempre e recebe como param a
  // conexão com o banco de dados.
  static init(sequelize) {
    super.init(
      {
        // Aqui passamos os campos da nossa tabela.
        name: Sequelize.STRING,
        data_pedido: Sequelize.DATE,
        hora_pedido: Sequelize.STRING,
        local_entrega: Sequelize.STRING,
        quantidade_items: Sequelize.INTEGER,
        forma_pagamento: Sequelize.STRING,
        produtos_selecionados: Sequelize.JSONB,
        valor_pedido: Sequelize.DOUBLE,
        pedido_faturado: Sequelize.BOOLEAN,
        // Não é preciso passar o id , nem as timestamps [created_at,updated_at]
      },
      // Aqui iremos passar a conexão :
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'id_user', as: 'user' });
  }
}

export default Pedidos;
