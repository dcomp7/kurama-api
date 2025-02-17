"use strict";

import Sequelize, { Model } from "sequelize";

class CustomerAddress extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_address_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        customer_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "billing",
        },
        street: Sequelize.STRING,
        street_number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        postal_code: Sequelize.CHAR(8),
        neighborhood: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.CHAR(2),
        country: {
          type: Sequelize.CHAR(2),
          defaultValue: "BR",
        },
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          allowNull: false,
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "customer_addresses",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      as: "customer",
    });
  }
}

export default CustomerAddress;
