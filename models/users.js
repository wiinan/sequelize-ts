"use strict";
const bcryptjs = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      confirm_password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Users",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      hooks: {
        beforeCreate: async user => {
          try {
            const salt = await bcryptjs.genSalt();
            const passCrypted = bcryptjs
              .hashSync(user.password, salt)
              .toString();
            user.password = passCrypted;
          } catch (err) {
            throw err;
          }
        },
      },
    }
  );
  return Users;
};
