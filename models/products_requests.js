"use strict";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Products_requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Products, { foreignKey: "product_id" });
      this.belongsTo(models.Requests, { foreignKey: "request_id" });
      this.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Products_requests.init(
    {
      request_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.STRING, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      total_price: { type: DataTypes.FLOAT, allowNull: false },
      status: {
        type: DataTypes.ENUM({
          values: ["open", "finished", "canceled"],
        }),
        allowNull: true,
        defaultValue: "open",
      },
    },
    {
      sequelize,
      modelName: "Products_requests",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return Products_requests;
};
