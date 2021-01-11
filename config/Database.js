import { Sequelize } from "sequelize";
import config from "./Environment";

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  host: config.dbHost,
  port: config.dbPort,
  dialect: config.dbDialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
