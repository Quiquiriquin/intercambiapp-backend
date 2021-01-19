export default (sequelize, DataTypes) => {
  const Exchange = sequelize.define("Exchange", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    reservationLimit: {
      type: DataTypes.DATE,
    },
    budget: {
      type: DataTypes.INTEGER,
    },
    observations: {
      type: DataTypes.STRING,
    },
    key: {
      type: DataTypes.STRING,
    },
  });

  Exchange.associate = (models) => {
    Exchange.belongsToMany(models.Category, {
      through: "ExchangeCategory",
      foreignKey: "idExchange",
      otherKey: "idCategory",
    });
    Exchange.belongsTo(models.User, {
      foreignKey: "idUser",
    });
    Exchange.belongsToMany(models.Invitation, {
      through: "ExchangeInvitations",
      foreignKey: "idExchange",
      otherKey: "idInvitation",
    });
  };

  return Exchange;
};
