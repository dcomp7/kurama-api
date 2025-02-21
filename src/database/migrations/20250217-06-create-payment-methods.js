"use strict";

const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable("payment_methods", {
      payment_method_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(
          "CREDIT_CARD",
          "BANK_SLIP",
          "BANK_TRANSFER",
          "VOUCHER",
        ),
        allowNull: false,
      },
      fee: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.0,
        allowNull: true,
      },
      processing_days: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
    return queryInterface.dropTable("payment_methods");
  },
};
