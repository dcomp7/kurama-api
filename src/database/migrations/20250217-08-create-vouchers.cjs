"use strict";

const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable("vouchers", {
      voucher_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM(
          "CREDIT",
          "FIXED_DISCOUNT",
          "PERCENTAGE_DISCOUNT",
          "FREE_SHIPPING",
        ),
        allowNull: false,
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      max_usage: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "customers",
          key: "customer_id",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
      is_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable("vouchers");
  },
};
