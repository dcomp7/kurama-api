"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("payment_transactions", {
      payment_transaction_id: {
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
      order_invoice_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "order_invoices",
          key: "order_invoice_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      card_brand: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      authorization_code: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      installment_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      transaction_reference: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      unique_sequence_number: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      cardholder_name: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      processing_date: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable("payment_transactions");
  },
};
