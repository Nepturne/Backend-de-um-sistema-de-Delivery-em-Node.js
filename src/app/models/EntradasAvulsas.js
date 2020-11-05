import Sequelize, { Model } from 'sequelize';

class EntradasAvulsas extends Model {
  // Método estático que inicia o nosso model sempre e recebe como param a
  // conexão com o banco de dados.
  static init(sequelize) {
    super.init(
      {
        data_hora_avulsa: Sequelize.DATE,
        quem_fez_avulsa: Sequelize.STRING,
          titulo_avulsa: Sequelize.STRING,
          motivo_avulsa: Sequelize.STRING,
        valor_de_avulsa: Sequelize.DOUBLE,
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
      as: 'entradas_avulsas',
    });
  }
}

export default EntradasAvulsas;
