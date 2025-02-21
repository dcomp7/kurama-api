"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("customers", {
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      full_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      document_id: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        allowNull: true,
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      mobile_phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      is_mobile_phone_confirmed: {
        type: Sequelize.ENUM("yes", "no"),
        defaultValue: "no",
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      is_email_confirmed: {
        type: Sequelize.ENUM("yes", "no"),
        defaultValue: "no",
      },
      password_hash: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      has_newsletter_subscription: {
        type: Sequelize.ENUM("yes", "no"),
        defaultValue: "no",
      },
      internal_note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.ENUM("yes", "no"),
        allowNull: false,
        defaultValue: "yes",
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
    return queryInterface.dropTable("customers");
  },
};
