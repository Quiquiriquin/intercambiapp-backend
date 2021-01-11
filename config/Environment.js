import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbDialect: process.env.DB_DIALECT,
  dbName: process.env.DB_NAME,
};

export default config;
