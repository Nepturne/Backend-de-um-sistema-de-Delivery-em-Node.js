'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('entradas_avulsas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_caixa: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'caixa_unes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      data_hora_avulsa: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      quem_fez_avulsa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      titulo_avulsa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      motivo_avulsa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor_de_avulsa: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('entradasavulsas');
  },
};
