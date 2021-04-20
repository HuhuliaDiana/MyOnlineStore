module.exports = (sequelize, DataTypes) => {
    return sequelize.define("RatingProduct", {
        rating: 
        {
            type: DataTypes.FLOAT,
            defaultValue: '0'
        },
        /*nrRatings:{
            type:DataTypes.INTEGER,
            defaultValue: '0'
        }*/
      
    });
  };
  