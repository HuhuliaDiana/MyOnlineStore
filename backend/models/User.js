module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },

    discount: {
      type: DataTypes.INTEGER,
      defaultValue: "0",
    },
  });
};
