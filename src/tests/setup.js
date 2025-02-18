import sequelize from "../database";

export default () => {
  sequelize.authenticate();
  sequelize.sync({ force: true });
};
