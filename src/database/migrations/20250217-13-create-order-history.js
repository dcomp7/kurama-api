"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("order_history", {
      order_history_id: {
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
      event_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: Sequelize.ENUM(
          "pending_payment",
          "pending_shipment",
          "pending_receipt",
          "completed",
          "expired",
          "canceled",
        ),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable("order_history");
  },
};
