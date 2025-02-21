"use strict";

import Sequelize, { Model } from "sequelize";

class CustomerReview extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_review_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        customer_id: Sequelize.INTEGER,
        product_id: Sequelize.INTEGER,
        order_id: Sequelize.INTEGER,
        review_date: Sequelize.DATE,
        review: Sequelize.TEXT,
        stars: Sequelize.TINYINT,
        is_active: Sequelize.ENUM("yes", "no"),
      },
      {
        sequelize,
        tableName: "customer_reviews",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    this.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
  }
}

export default CustomerReview;
