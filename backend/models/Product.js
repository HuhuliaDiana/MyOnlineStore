module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Product",
    {
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,

      brand: DataTypes.STRING,
      model: DataTypes.STRING,

      dimensions: DataTypes.STRING,
      weight: DataTypes.STRING,

      memRAM: DataTypes.STRING,
      memInternal: DataTypes.STRING,

      selfieCam: DataTypes.STRING,
      mainCam: DataTypes.STRING,

      battery: DataTypes.STRING,

      displayRes: DataTypes.STRING,
      displaySize: DataTypes.STRING, //mai trebuie filtru

      //dual sim, color

      netSpeed: DataTypes.STRING,
      USB: DataTypes.STRING,

      discount: {
        type: DataTypes.INTEGER,
        defaultValue: "0",
      },
      photos: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );
};
