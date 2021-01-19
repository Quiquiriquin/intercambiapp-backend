import UserModel from "./UserModel";
import Sequelize, { DataTypes } from "sequelize";
import sequelize from "../../config/Database";
import ExchangeModel from "./ExchangeModel";
import Category from "./Category";
import Invitation from "./Invitation";

const models = {
  User: UserModel(sequelize, DataTypes),
  Exchange: ExchangeModel(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
  Invitation: Invitation(sequelize, DataTypes),
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
