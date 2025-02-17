"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("customer_addresses", {
      customer_address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customers",
          key: "customer_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_main_address: {
        type: Sequelize.ENUM("yes", "no"),
        defaultValue: "no",
      },
      address_type: {
        type: Sequelize.ENUM("delivery", "billing"),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "billing",
      },
      street: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      street_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.CHAR(8),
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      state: {
        type: Sequelize.CHAR(2),
        allowNull: false,
      },
      country: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        defaultValue: "BR",
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

  down(queryInterface) {
    return queryInterface.dropTable("customer_addresses");
  },
};
