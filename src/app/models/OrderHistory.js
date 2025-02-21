"use strict";

import Sequelize, { Model } from "sequelize";

class OrderHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        order_history_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        order_id: Sequelize.INTEGER,
        event_date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        status: Sequelize.ENUM(
          "pending_payment",
          "pending_shipment",
          "pending_receipt",
          "completed",
          "expired",
          "canceled",
        ),
        description: Sequelize.TEXT,
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "order_history",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
  }
}

export default OrderHistory;
