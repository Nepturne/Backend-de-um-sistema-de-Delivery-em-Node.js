'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('entradas', {
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
      id_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data_hora_pedido: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      quem_fez_entrada: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      titulo_entrada: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor_de_entrada: {
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
    return queryInterface.dropTable('tb_entradas');
  },
};
