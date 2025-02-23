import { Sequelize } from "sequelize";
import config from "../config/database.mjs";
import User from "../app/models/User.js";
import Customer from "../app/models/Customer.js";
import CustomerAddress from "../app/models/CustomerAddress.js";
import Order from "../app/models/Order.js";
import OrderItem from "../app/models/OrderItem.js";
import OrderInvoice from "../app/models/OrderInvoice.js";
import OrderHistory from "../app/models/OrderHistory.js";
import Product from "../app/models/Product.js";
import Media from "../app/models/Media.js";
import CustomerReview from "../app/models/CustomerReview.js";
import Category from "../app/models/Category.js";
import Trip from "../app/models/Trip.js";
import ProductItem from "../app/models/ProductItem.js";
import PaymentTransaction from "../app/models/PaymentTransaction.js";
import PaymentMethod from "../app/models/PaymentMethod.js";
import PaymentEvent from "../app/models/PaymentEvent.js";
import OrderTicket from "../app/models/OrderTicket.js";

const models = [
  User,
  Customer,
  CustomerAddress,
  Category,
  Trip,
  Media,
  Order,
  OrderItem,
  OrderInvoice,
  OrderHistory,
  Product,

  CustomerReview,

  ProductItem,
  PaymentTransaction,
  PaymentMethod,
  PaymentEvent,
  OrderTicket,
];
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
