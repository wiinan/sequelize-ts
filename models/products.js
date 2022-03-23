"use strict";
import { Model } from "sequelize";
import { v4 as uuid } from "uuid";

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Products_requests, { foreignKey: "product_id" });
      this.hasMany(models.Carts, { foreignKey: "product_id" });
    }
  }
  Products.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      modelName: "Products",
      hooks: {
        beforeCreate: async (product) => {
          product.id = uuid();
        },
      },
    }
  );

  return Products;
};
