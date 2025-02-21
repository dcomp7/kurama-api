"use strict";

import Sequelize, { Model } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        category_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        seo_url: Sequelize.STRING,
        content: Sequelize.TEXT,
        is_active: Sequelize.ENUM("yes", "no"),
      },
      {
        sequelize,
        tableName: "categories",
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

export default Category;
