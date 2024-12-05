'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM("MANAGER", "ADMIN"),
        allowNull: false,
        defaultValue: "ADMIN",
    },
      avatar: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
    },
    phone: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    refresh_token: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    }, {
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: ['id']
        }
      ]
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admins');
  }
};
