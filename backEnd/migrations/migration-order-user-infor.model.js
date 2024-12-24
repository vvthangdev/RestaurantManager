'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_user_info',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_detail_id: {
            type: Sequelize.INTEGER,
            unique: true,
            references: {
                model: 'order_detail',
                key: 'id'
            },
            onDelete: "CASCADE"
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        
    }
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_user_info');
  }
};
