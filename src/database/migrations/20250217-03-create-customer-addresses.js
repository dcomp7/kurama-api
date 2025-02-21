"use strict";

const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable("customer_addresses", {
      customer_address_id: {
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
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_main_address: {
        type: DataTypes.ENUM("yes", "no"),
        defaultValue: "no",
      },
      address_type: {
        type: DataTypes.ENUM("delivery", "billing"),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "billing",
      },
      street: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      street_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.CHAR(8),
        allowNull: false,
      },
      neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      state: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      country: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        defaultValue: "BR",
      },
      is_active: {
        type: DataTypes.ENUM("yes", "no"),
        allowNull: false,
        defaultValue: "yes",
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
    return queryInterface.dropTable("customer_addresses");
  },
};
