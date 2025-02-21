"use strict";

import Sequelize, { Model } from "sequelize";

class ProductItem extends Model {
  static init(sequelize) {
    super.init(
      {
        product_item_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        product_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        start_sell_date: Sequelize.DATE,
        end_sell_date: Sequelize.DATE,
        status: {
          type: Sequelize.ENUM("available", "unavailable", "hidden"),
          defaultValue: "unavailable",
        },
        price: {
          type: Sequelize.DECIMAL(12, 2).UNSIGNED,
          defaultValue: 0.0,
        },
        normal_price: Sequelize.DECIMAL(12, 2).UNSIGNED,
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "product_items",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
  }
}

export default ProductItem;
