"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Products, { foreignKey: "product_id" });
      this.belongsTo(models.Users, { foreignKey: "user_id" });
    }
  }
  Carts.init(
    {
      product_id: { type: DataTypes.STRING, allowNull: false },
      total_price: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Carts",
    }
  );
  return Carts;
};
