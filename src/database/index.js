import { Sequelize } from "sequelize";
import config from "../config/database";
import User from "../app/models/User";
import Customer from "../app/models/Customer";
import CustomerAddress from "../app/models/CustomerAddress";
import Order from "../app/models/Order";
import OrderItem from "../app/models/OrderItem";
import OrderInvoice from "../app/models/OrderInvoice";
import OrderHistory from "../app/models/OrderHistory";
import Product from "../app/models/Product";
import Media from "../app/models/Media";
import CustomerReview from "../app/models/CustomerReview";
import Category from "../app/models/Category";
import Trip from "../app/models/Trip";
import ProductItem from "../app/models/ProductItem";
import PaymentTransaction from "../app/models/PaymentTransaction";
import PaymentMethod from "../app/models/PaymentMethod";
import PaymentEvent from "../app/models/PaymentEvent";
import OrderTicket from "../app/models/OrderTicket";

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
