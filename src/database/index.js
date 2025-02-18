import { Sequelize } from "sequelize";

import config from "../config/database";
import User from "../app/models/User";
import Customer from "../app/models/Customer";
import CustomerAddress from "../app/models/CustomerAddress";
import dotenv from "dotenv";

const models = [User, Customer, CustomerAddress];
const sequelizeConfig = config;

class Database {
  constructor() {
    this.connection = new Sequelize({
      ...sequelizeConfig,
      logging: process.env.DB_LOGGING === "true" ? console.log : false,
    });
    this.init();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
    models.forEach(
      (model) => model.associate && model.associate(this.connection.models),
    );
  }
}

export default new Database().connection;
