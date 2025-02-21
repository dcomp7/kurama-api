"use strict";

const { DataTypes, Sequelize } = require("sequelize");

module.exports = {
  up: (queryInterface) => {
    return queryInterface.createTable("medias", {
      media_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      trip_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      review_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      context: {
        type: DataTypes.ENUM(
          "product_main",
          "product_gallery",
          "review_item",
          "trip_main",
          "trip_gallery",
        ),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("photo", "video"),
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      seo_file_name: {
        type: DataTypes.STRING(200),
        allowNull: true,
        unique: true,
      },
      uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.ENUM("yes", "no"),
        defaultValue: "yes",
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      modified_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("medias");
  },
};
