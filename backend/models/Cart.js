module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Cart", {
      totalPrice: {
        type: DataTypes.FLOAT,
        defaultValue: '0'
      }
       
    });
  };
  