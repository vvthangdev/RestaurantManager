'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reservation_table',{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reservation_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'order_detail',
        key: "id",
      },
      onDelete: "CASCADE",
    },
    table_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'table_info',
        key: "table_number",
      },
      onDelete: "CASCADE",
    },
    start_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_time: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reservation_table');
  }
};
