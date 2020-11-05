import Sequelize, { Model } from 'sequelize';

class Saidas extends Model {
  // Método estático que inicia o nosso model sempre e recebe como param a
  // conexão com o banco de dados.
  static init(sequelize) {
    super.init(
      {
        data_hora_saida: Sequelize.DATE,
        quem_fez_saida: Sequelize.STRING,
        titulo_saida: Sequelize.STRING,
        motivo_saida: Sequelize.STRING,
        valor_de_saida: Sequelize.DOUBLE,
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
      as: 'tb_saidas',
    });
  }
}

export default Saidas;
