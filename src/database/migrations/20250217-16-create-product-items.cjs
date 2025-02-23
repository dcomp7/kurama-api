"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("product_items", {
      product_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "product_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      start_sell_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_sell_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("available", "unavailable", "hidden"),
        defaultValue: "unavailable",
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2).UNSIGNED,
        defaultValue: 0.0,
        allowNull: false,
      },
      normal_price: {
        type: Sequelize.DECIMAL(12, 2).UNSIGNED,
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
    return queryInterface.dropTable("product_items");
  },
};
