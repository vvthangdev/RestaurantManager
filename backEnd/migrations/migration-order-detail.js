'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_detail', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  type: {
    type: Sequelize.ENUM('reservation', 'ship'),
    allowNull: false,
  },
  num_people: {
    type: Sequelize.INTEGER,
    allowNull: true, // Không bắt buộc khi type là 'ship'
    validate: {
      min: 1, // Đảm bảo số người phải >= 1 nếu có giá trị
    },},
  status: { // ship use only 'confirmed' and 'canceled'
    type: Sequelize.ENUM('pending', 'confirmed', 'canceled', 'out_of_seats'),
    defaultValue: 'pending',
  },
  star: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  comment: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_detail');
  }
};
