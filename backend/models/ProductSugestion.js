module.exports = (sequelize, DataTypes) => {
  return sequelize.define("ProductSugestion", {
    note: DataTypes.STRING(255),
    to: DataTypes.STRING,
    discountUsed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
