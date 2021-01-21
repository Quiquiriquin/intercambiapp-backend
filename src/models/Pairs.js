export default (sequelize, DataTypes) => {
  const Pairs = sequelize.define("Pairs", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  Pairs.associate = (models) => {
    Pairs.belongsTo(models.Invitation, {
      foreignKey: "from",
      as: "fromInvite",
    });
    Pairs.belongsTo(models.Invitation, {
      foreignKey: "to",
      as: "toInvite",
    });

    Pairs.belongsTo(models.Exchange, {
      foreignKey: "idExchange",
    });
  };

  return Pairs;
};
