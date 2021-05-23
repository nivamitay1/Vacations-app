const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

class Vacation extends Model {}
Vacation.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dates: { type: DataTypes.STRING, allowNull: false },
    created_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "vacation", timestamps: false }
);

module.exports = Vacation;
