"use strict";

import Sequelize, { Model } from "sequelize";

class OrderInvoice extends Model {
  static init(sequelize) {
    super.init(
      {
        order_invoice_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        order_id: Sequelize.INTEGER,
        payment_method_id: Sequelize.INTEGER,
        issue_date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        due_date: Sequelize.DATE,
        payment_date: Sequelize.DATE,
        installment_number: Sequelize.INTEGER,
        amount: Sequelize.DECIMAL(10, 2),
        authentication_code: Sequelize.STRING,
        is_canceled: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "order_invoices",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    this.belongsTo(models.PaymentMethod, {
      foreignKey: "payment_method_id",
      as: "payment_method",
    });
  }
}

export default OrderInvoice;
