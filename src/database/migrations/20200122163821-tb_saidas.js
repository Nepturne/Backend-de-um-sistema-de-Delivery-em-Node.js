'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('saidas', {
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
      data_hora_saida: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      quem_fez_saida: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      titulo_saida: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      motivo_saida: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor_de_saida: {
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
    return queryInterface.dropTable('tb_saidas');
  },
};
