import UserModel from "./UserModel";
import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../../config/Database";

const models = {
  User: UserModel(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

global.sequelize = sequelize;
models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
