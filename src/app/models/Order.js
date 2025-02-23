"use strict";

import Sequelize, { Model } from "sequelize";

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        customer_id: Sequelize.INTEGER,
        customer_address_id: Sequelize.INTEGER,
        payment_method_id: Sequelize.INTEGER,
        voucher_code: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: Sequelize.ENUM(
          "cart",
          "pending_payment",
          "pending_shipment",
          "pending_receipt",
          "completed",
          "expired",
          "canceled",
        ),
        subtotal: Sequelize.DECIMAL,
        shipping_cost: Sequelize.DECIMAL,
        discount_amount: Sequelize.DECIMAL,
        is_active: Sequelize.ENUM("yes", "no"),
      },
      {
        sequelize,
        tableName: "orders",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate() {
    /*
    this.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
    this.belongsTo(models.CustomerAddress, {
      foreignKey: "customer_address_id",
      as: "customer_address",
    });
    this.belongsTo(models.PaymentMethod, {
      foreignKey: "payment_method_id",
      as: "payment_method",
    });
    this.belongsTo(models.Voucher, {
      foreignKey: "voucher_code",
      as: "voucher",
    });*/
  }
}

export default Order;
