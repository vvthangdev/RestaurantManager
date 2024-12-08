const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config"); // Adjust the path to your database config

const TableInfo = sequelize.define('TableInfo', {
  table_number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
    charset: 'utf8mb4', // Mã hóa UTF-8 cho bảng
    collate: 'utf8mb4_unicode_ci', // Chỉ định phương pháp so sánh chuỗi
    tableName: 'table_info',
    timestamps: false,
});

module.exports = TableInfo;

