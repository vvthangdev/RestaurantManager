'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('item_order',{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item_id: {
      type: Sequelize.INTEGER,
      allowNull: false, // Cột này không thể null
      references: {
        model: "foods", // Tên bảng tham chiếu
        key: "id", // Tên cột tham chiếu trong bảng `item`
      },
      onDelete: "CASCADE", // Xóa dữ liệu liên quan khi xóa item
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: true, // Cột này có thể null nếu không có giá trị
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false, // Cột này không thể null
      references: {
        model: "order_detail", // Tên bảng tham chiếu
        key: "id", // Tên cột tham chiếu trong bảng `order_detail`
      },
      onDelete: "CASCADE", // Xóa dữ liệu liên quan khi xóa order
    },
  }
      );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('item_order');
  }
};
