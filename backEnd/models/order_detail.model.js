const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
//const User = require('./user.model');  // Đảm bảo đã import mô hình User
const OrderUserInfo = require('./order_user_info.model')
const OrderDetail = sequelize.define('OrderDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  type: {
    type: DataTypes.ENUM('reservation', 'ship'),
    allowNull: false,
  },
  num_people: {
    type: DataTypes.INTEGER,
    allowNull: true, // Không bắt buộc khi type là 'ship'
    validate: {
      min: 1, // Đảm bảo số người phải >= 1 nếu có giá trị
    },},
  status: { // ship use only 'confirmed' and 'canceled'
    type: DataTypes.ENUM('pending', 'confirmed', 'canceled', 'out_of_seats'),
    defaultValue: 'pending',
  },
  star: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  comment: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  charset: 'utf8mb4', // Mã hóa UTF-8 cho bảng
  collate: 'utf8mb4_unicode_ci', // Chỉ định phương pháp so sánh chuỗi
  tableName: 'order_detail',
  timestamps: false,
});


module.exports = OrderDetail;
