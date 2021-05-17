module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Order",
    {
      town: DataTypes.STRING,
      county: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      price: {
        type: DataTypes.FLOAT,
      },
      createdAt: {
        type: DataTypes.DATEONLY,
      },
      updatedAt: {
        type: DataTypes.DATEONLY,
      },
      paymentMethod: DataTypes.STRING,
      lastname: DataTypes.STRING,
      firstname: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );
};
