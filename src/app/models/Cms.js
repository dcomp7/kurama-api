"use strict";

import Sequelize, { Model } from "sequelize";

class Cms extends Model {
  static init(sequelize) {
    super.init(
      {
        cms_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        key: {
          type: Sequelize.STRING(200),
          allowNull: false,
          unique: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM("pending", "archived", "published"),
          allowNull: false,
          defaultValue: "pending",
        },
        created_by: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          allowNull: false,
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "cms",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
  }
}

export default Cms;
