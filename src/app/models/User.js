"use strict";

import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        role: {
          type: Sequelize.ENUM("admin", "manager", "user"),
          allowNull: false,
          defaultValue: "user",
        },
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          allowNull: false,
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "users",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    //this.hasMany(models.Cms, { foreignKey: "created_by", as: "cms" });
  }
}

export default User;
