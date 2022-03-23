"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Providers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Requests, { foreignKey: "provider_id" });
    }
  }
  Providers.init(
    {
      name: { type: DataTypes.STRING(32), allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cep: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { len: [8, 9] },
      },
      street: { type: DataTypes.STRING(64), allowNull: false },
      city: { type: DataTypes.STRING(32), allowNull: false },
      country: { type: DataTypes.STRING(32), allowNull: false },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      number: DataTypes.INTEGER,
    },
    {
      sequelize,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      modelName: "Providers",
    }
  );
  return Providers;
};
