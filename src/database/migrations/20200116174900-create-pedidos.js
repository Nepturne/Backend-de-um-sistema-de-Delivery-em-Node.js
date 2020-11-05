'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pedidos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_pedido: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hora_pedido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      local_entrega: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantidade_items: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      forma_pagamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      produtos_selecionados: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      valor_pedido: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      pedido_faturado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('pedidos');
  },
};
