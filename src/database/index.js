import { Sequelize } from "sequelize";

import config from "../config/database";
import User from "../app/models/User";
import Customer from "../app/models/Customer";
import CustomerAddress from "../app/models/CustomerAddress";

const models = [User, Customer, CustomerAddress];
const sequelizeConfig = config;

class Database {
  constructor() {
    this.connection = new Sequelize(sequelizeConfig);
    this.init();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
    models.forEach(
      (model) => model.associate && model.associate(this.connection.models),
    );
  }
}

export default new Database();
