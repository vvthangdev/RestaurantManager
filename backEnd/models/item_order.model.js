const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config"); // Đảm bảo bạn thay đổi đường dẫn cho phù hợp

const ItemOrder = sequelize.define(
  "ItemOrder",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Cột này không thể null
      references: {
        model: "foods", // Tên bảng tham chiếu
        key: "id", // Tên cột tham chiếu trong bảng `item`
      },
      onDelete: "CASCADE", // Xóa dữ liệu liên quan khi xóa item
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true, // Cột này có thể null nếu không có giá trị
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Cột này không thể null
      references: {
        model: "order_detail", // Tên bảng tham chiếu
        key: "id", // Tên cột tham chiếu trong bảng `order_detail`
      },
      onDelete: "CASCADE", // Xóa dữ liệu liên quan khi xóa order
    },
  },
  {
    charset: 'utf8mb4', // Mã hóa UTF-8 cho bảng
    collate: 'utf8mb4_unicode_ci', // Chỉ định phương pháp so sánh chuỗi
    tableName: "item_order", // Tên bảng trong cơ sở dữ liệu
    timestamps: false, // Nếu không muốn sử dụng `createdAt` và `updatedAt`
  }
);

module.exports = ItemOrder;
