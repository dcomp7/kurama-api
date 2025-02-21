"use strict";

const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable("orders", {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "customer_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      customer_address_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "customer_addresses",
          key: "customer_address_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      payment_method_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "payment_methods",
          key: "payment_method_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      voucher_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
        references: {
          model: "vouchers",
          key: "code",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "cart",
          "pending_payment",
          "pending_shipment",
          "pending_receipt",
          "completed",
          "expired",
          "canceled",
        ),
        defaultValue: "pending_payment",
        allowNull: true,
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      shipping_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.ENUM("yes", "no"),
        defaultValue: "yes",
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      modified_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("orders");
  },
};
