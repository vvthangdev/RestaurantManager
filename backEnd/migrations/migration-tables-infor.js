'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('table_info',{
        table_number: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        capacity: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        } 
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('table_info');
  }
};
