"use strict";

import Sequelize, { Model } from "sequelize";

class PaymentTransaction extends Model {
  static init(sequelize) {
    super.init(
      {
        payment_transaction_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        order_id: Sequelize.INTEGER,
        order_invoice_id: Sequelize.INTEGER,
        card_brand: Sequelize.STRING,
        installments: Sequelize.INTEGER,
        authorization_code: Sequelize.STRING,
        installment_value: Sequelize.DECIMAL(10, 2),
        transaction_reference: Sequelize.STRING,
        unique_sequence_number: Sequelize.STRING,
        cardholder_name: Sequelize.STRING,
        processing_date: Sequelize.DATE,
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "payment_transactions",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    this.belongsTo(models.OrderInvoice, {
      foreignKey: "order_invoice_id",
      as: "order_invoice",
    });
  }
}

export default PaymentTransaction;
