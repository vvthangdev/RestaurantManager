
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config"); // Adjust the path to your database config

const Admin = sequelize.define(
  "Admin",
  {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM("STAFF", "ADMIN"),
        allowNull: true,
        defaultValue: "STAFF",
    },
      isAdmin : {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    ,
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    charset: 'utf8mb4', // Mã hóa UTF-8 cho bảng
    collate: 'utf8mb4_unicode_ci', // Chỉ định phương pháp so sánh chuỗi
    tableName: "admins", // Matches the existing table name in the database
    timestamps: false, // Disable timestamps if your table does not have `createdAt` and `updatedAt` fields
  }
);

module.exports = Admin;

