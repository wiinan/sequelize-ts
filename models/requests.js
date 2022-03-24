"use strict";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Providers, { foreignKey: "provider_id" });
      this.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Requests.init(
    {
      provider_id: { type: DataTypes.INTEGER, allowNull: false },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Requests",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return Requests;
};
