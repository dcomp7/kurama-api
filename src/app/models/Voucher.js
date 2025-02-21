"use strict";

import Sequelize, { Model } from "sequelize";

class Voucher extends Model {
  static init(sequelize) {
    super.init(
      {
        voucher_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        code: Sequelize.STRING,
        type: Sequelize.ENUM(
          "CREDIT",
          "FIXED_DISCOUNT",
          "PERCENTAGE_DISCOUNT",
          "FREE_SHIPPING",
        ),
        value: Sequelize.DECIMAL,
        expiration_date: Sequelize.DATE,
        max_usage: Sequelize.INTEGER,
        customer_id: Sequelize.INTEGER,
        is_used: Sequelize.BOOLEAN,
        is_active: Sequelize.ENUM("yes", "no"),
      },
      {
        sequelize,
        tableName: "vouchers",
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
  }
}

export default Voucher;
