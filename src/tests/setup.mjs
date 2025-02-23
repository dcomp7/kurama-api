import sequelize from "../database/index.js";

export default async () => {
  try {
    console.log("Initializing database.");
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
