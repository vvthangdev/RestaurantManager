'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contact',{
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,  
      autoIncrement: true
    },
    name: { 
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email: { 
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(15),
      allowNull: false
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    }
  }
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contact');
  }
};
