const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env.test") });
} else {
  dotenv.config();
}

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  define: {
    timestamps: process.env.DB_DEFINE_TIMESTAMPS === "true",
    underscored: process.env.DB_DEFINE_UNDERSCORED === "true",
    underscoredAll: process.env.DB_DEFINE_UNDERSCOREDALL === "true",
  },
};
