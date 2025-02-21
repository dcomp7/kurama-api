"use strict";

import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        product_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        category_id: Sequelize.INTEGER,
        trip_id: Sequelize.INTEGER,
        type: Sequelize.STRING,
        name: Sequelize.STRING,
        when: Sequelize.STRING,
        where: Sequelize.STRING,
        description: Sequelize.TEXT,
        exit_options: Sequelize.TEXT,
        status: {
          type: Sequelize.ENUM("available", "unavailable", "hidden"),
          defaultValue: "unavailable",
        },
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "products",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
    this.belongsTo(models.Trip, { foreignKey: "trip_id", as: "trip" });
  }
}

export default Product;
