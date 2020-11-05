import Sequelize, { Model } from 'sequelize';

class Entradas extends Model {
  // Método estático que inicia o nosso model sempre e recebe como param a
  // conexão com o banco de dados.
  static init(sequelize) {
    super.init(
      {
        id_pedido: Sequelize.INTEGER,
        data_hora_pedido: Sequelize.DATE,
        quem_fez_entrada: Sequelize.STRING,
        titulo_entrada: Sequelize.STRING,
        valor_de_entrada: Sequelize.DOUBLE,
      },

      {
        sequelize,
      }
    );

    return this;
  }
  static associatefor(models) {
    this.belongsTo(models.CaixaUnes, {
      foreignKey: 'id',
      as: 'tb_entradas',
    });
  }
}

export default Entradas;
