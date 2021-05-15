module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UserContact", {
    town: DataTypes.STRING,
    county: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
  });
};
