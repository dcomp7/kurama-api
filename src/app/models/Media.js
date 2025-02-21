"use strict";

import Sequelize, { Model } from "sequelize";

class Media extends Model {
  static init(sequelize) {
    super.init(
      {
        media_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        trip_id: Sequelize.INTEGER,
        product_id: Sequelize.INTEGER,
        review_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        customer_id: Sequelize.INTEGER,
        context: Sequelize.ENUM(
          "product_main",
          "product_gallery",
          "review_item",
          "trip_main",
          "trip_gallery",
        ),
        type: Sequelize.ENUM("photo", "video"),
        path: Sequelize.STRING,
        seo_file_name: Sequelize.STRING,
        uploaded_at: Sequelize.DATE,
        is_active: Sequelize.ENUM("yes", "no"),
      },
      {
        sequelize,
        tableName: "medias",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate() {
    // Define associations here if needed
  }
}

export default Media;
