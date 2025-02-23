"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("order_invoices", {
      order_invoice_id: {
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
      payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "payment_methods",
          key: "payment_method_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      issue_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      due_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      installment_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      authentication_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      is_canceled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable("order_invoices");
  },
};
