
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config"); // Adjust the path to your database config
const Foods = sequelize.define(
  "Foods",
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
      image: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
  },
  {
    tableName: "foods", // Matches the existing table name in the database
    timestamps: false, // Disable timestamps if your table does not have `createdAt` and `updatedAt` fields
  }
);

module.exports = Foods;