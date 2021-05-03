const ProductSugestionDB = require("../models").ProductSugestion;
const UserDB = require("../models").User;
const ProductDB = require("../models").Product;

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
  seeUsersWhoSuggestedProducts: async (req, res) => {
    const currentUser = await req.user;
    const suggestions = await ProductSugestionDB.findAll({
      where: {
        to: currentUser.email,
      },
      include: {
        model: UserDB,
        as: "User",
      },
    });
    let array = suggestions.map((s) => s.User);
    const jsonObject = array.map(JSON.stringify);

    const uniqueSet = new Set(jsonObject);
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    res.status(200).send(uniqueArray);
  },
  seeSuggestionsFromUser: async (req, res) => {
    const userId = req.params.id;
    const currentUser = await req.user;
    ProductSugestionDB.findAll({
      where: {
        UserId: userId,
        to: currentUser.email,
      },
      include: {
        model: ProductDB,
        as: "Product",
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  removeSuggestion: async (req, res) => {
    const productId = req.params.productId;
    const currentUser = await req.user;
    const userId = req.params.userId;

    const removedProduct = await ProductSugestionDB.destroy({
      where: {
        UserId: userId,
        to: currentUser.email,
        ProductId: productId,
      },
    });
    ProductSugestionDB.findAll({
      where: {
        UserId: userId,
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
};
module.exports = controllers;
