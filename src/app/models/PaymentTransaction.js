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
        order_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        order_invoice_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        card_brand: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        installments: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        authorization_code: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        installment_value: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
        },
        transaction_reference: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        unique_sequence_number: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        cardholder_name: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        processing_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "yes",
          allowNull: false,
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

  static associate() {
    /*
    this.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    this.belongsTo(models.OrderInvoice, {
      foreignKey: "order_invoice_id",
      as: "order_invoice",
    });
    */
  }
}

export default PaymentTransaction;
