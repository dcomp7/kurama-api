"use strict";

import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        full_name: Sequelize.STRING,
        document_id: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        gender: Sequelize.ENUM("M", "F"),
        birth_date: Sequelize.DATE,
        mobile_phone: Sequelize.STRING,
        is_mobile_phone_confirmed: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "no",
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        is_email_confirmed: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "no",
        },
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        has_newsletter_subscription: {
          type: Sequelize.ENUM("yes", "no"),
          defaultValue: "no",
        },
        internal_note: Sequelize.TEXT,
        is_active: {
          type: Sequelize.ENUM("yes", "no"),
          allowNull: false,
          defaultValue: "yes",
        },
      },
      {
        sequelize,
        tableName: "customers",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "modified_at",
      },
    );

    this.addHook("beforeSave", async (customer) => {
      if (customer.password) {
        customer.password_hash = await bcrypt.hash(customer.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.CustomerAddress, {
      foreignKey: "customer_id",
      as: "addresses",
    });
  }
}

export default Customer;
