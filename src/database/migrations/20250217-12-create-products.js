"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("products", {
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "categories",
          key: "category_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      trip_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "trips",
          key: "trip_id",
        },
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
      },
      type: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      when: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      where: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      exit_options: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("available", "unavailable", "hidden"),
        defaultValue: "unavailable",
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
    return queryInterface.dropTable("products");
  },
};
