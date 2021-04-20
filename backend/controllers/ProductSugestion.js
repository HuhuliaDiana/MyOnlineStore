const ProductSugestionDB = require("../models").ProductSugestion;

const controllers = {
  getSugestions: async (req, res) => {
    const currentUser = await req.user;
    ProductSugestionDB.findAll({
      where: {
        to: currentUser.email,
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  seeSentSugestions: async (req, res) => {
    const currentUser = await req.user;
    ProductSugestionDB.findAll({
      where: {
        UserId: currentUser.id,
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  editNote: async (req, res) => {
    const currentUser = await req.user;
    const sugestion = await ProductSugestionDB.findByPk(req.body.idSugestion);
    sugestion
      .update({
        note: req.body.newNote,
      })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
module.exports = controllers;
