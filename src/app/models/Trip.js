"use strict";

import Sequelize, { Model } from "sequelize";

class Trip extends Model {
  static init(sequelize) {
    super.init(
      {
        trip_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        occurrence: Sequelize.TEXT,
        description: Sequelize.TEXT,
        is_active: Sequelize.ENUM("yes", "no"),
      },
      {
        sequelize,
        tableName: "trips",
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

export default Trip;
