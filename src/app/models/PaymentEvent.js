"use strict";

import Sequelize, { Model } from "sequelize";

class PaymentEvent extends Model {
  static init(sequelize) {
    super.init(
      {
        payment_event_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        order_id: Sequelize.INTEGER,
        event_date: Sequelize.DATE,
        event_type: Sequelize.STRING,
        details: Sequelize.TEXT,
        error_code: Sequelize.STRING,
        amount: Sequelize.DECIMAL,
        status: Sequelize.ENUM("pending", "processed"),
        is_active: Sequelize.ENUM("yes", "no"),
      },
      {
        sequelize,
        tableName: "payment_events",
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

export default PaymentEvent;
