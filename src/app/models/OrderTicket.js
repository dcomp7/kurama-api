"use strict";

import Sequelize, { Model } from "sequelize";

class OrderTicket extends Model {
  static init(sequelize) {
    super.init(
      {
        order_ticket_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        order_id: Sequelize.INTEGER,
        order_item_id: Sequelize.INTEGER,
        product_id: Sequelize.INTEGER,
        product_item_id: Sequelize.INTEGER,
        holder_name: Sequelize.STRING,
        holder_document: Sequelize.STRING,
        holder_phone: Sequelize.STRING,
        exit_option: Sequelize.TEXT,
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "order_tickets",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    this.belongsTo(models.OrderItem, {
      foreignKey: "order_item_id",
      as: "order_item",
    });
    this.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    this.belongsTo(models.ProductItem, {
      foreignKey: "product_item_id",
      as: "product_item",
    });
  }
}

export default OrderTicket;
