const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/connection");
const User = require("./User");
const Vacation = require("./Vacation");

class Follow extends Model {}
Follow.init(
  {
    vacation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Vacation,
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    created_at: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "follow", timestamps: false }
);

User.hasMany(Follow, { foreignKey: "user_id" });
Follow.belongsTo(User, { foreignKey: "user_id" });
Vacation.hasMany(Follow, { foreignKey: "vacation_id" });
Follow.belongsTo(Vacation, { foreignKey: "vacation_id" });

module.exports = Follow;
