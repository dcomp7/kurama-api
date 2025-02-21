"use strict";

import Sequelize, { Model } from "sequelize";

class PaymentMethod extends Model {
  static init(sequelize) {
    super.init(
      {
        payment_method_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        type: Sequelize.ENUM(
          "CREDIT_CARD",
          "BANK_SLIP",
          "BANK_TRANSFER",
          "VOUCHER",
        ),
        fee: Sequelize.DECIMAL,
        processing_days: Sequelize.INTEGER,
        is_active: Sequelize.ENUM("yes", "no"),
      },
      {
        sequelize,
        tableName: "payment_methods",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate() {
    // Define associations here if needed
  }
}

export default PaymentMethod;
