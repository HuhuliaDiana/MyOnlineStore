const Sequelize = require("sequelize");

const sequelize = new Sequelize("WiseCellDB", "root", "", {
  dialect: "mysql",
  host: "localhost",
  port: 3307,
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
