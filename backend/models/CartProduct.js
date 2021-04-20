module.exports = (sequelize, DataTypes) => {
    return sequelize.define("CartProduct", {
        quantity: 
        {
            type: DataTypes.INTEGER,
            defaultValue: '1'
        }
      
    });
  };
  