"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("order_items", {
      order_item_id: {
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
      quantity: {
        type: Sequelize.TINYINT,
        defaultValue: 1,
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

  down(queryInterface) {
    return queryInterface.dropTable("order_items");
  },
};
