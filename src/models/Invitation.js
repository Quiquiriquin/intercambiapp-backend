export default (sequelize, DataTypes) => {
  const Invitation = sequelize.define("Invitation", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Invitation.associate = (models) => {};

  return Invitation;
};
