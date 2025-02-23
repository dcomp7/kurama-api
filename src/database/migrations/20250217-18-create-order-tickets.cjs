"use strict";

const Sequelize = require("sequelize");

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable("order_tickets", {
      order_ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "order_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      order_item_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "order_items",
          key: "order_item_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "product_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      product_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "product_items",
          key: "product_item_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      holder_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      holder_document: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      holder_phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      exit_option: {
        type: Sequelize.TEXT,
        defaultValue: "0",
        allowNull: true,
      },
      is_active: {
        type: Sequelize.ENUM("yes", "no"),
        defaultValue: "yes",
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      modified_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("order_tickets");
  },
};
