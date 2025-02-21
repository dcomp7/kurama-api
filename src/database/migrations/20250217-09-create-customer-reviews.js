"use strict";

const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable("customer_reviews", {
      customer_review_id: {
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
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      review_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stars: {
        type: DataTypes.TINYINT.UNSIGNED,
        defaultValue: 5,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.ENUM("yes", "no"),
        defaultValue: "yes",
        allowNull: true,
      },
      creation_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
      },
      modification_date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("customer_reviews");
  },
};
