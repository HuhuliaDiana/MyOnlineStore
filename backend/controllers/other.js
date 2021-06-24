const connection = require("../models").connection;

const controller = {
  reset: (req, res) => {
    connection
      .sync({
        force: true,
      })
      .then(() => {
        res.status(200).send({
          message: "Database reset",
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  checkAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/alreadyAuth");
    }
    return next();
  },

  checkNotAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/notAuth");
  },
 
};

module.exports = controller;
