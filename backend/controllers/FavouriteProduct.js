const CartProductDB = require("../models").CartProduct;
const ProductDB = require("../models").Product;
const CartDB = require("../models").Cart;
const OrderDB = require("../models").Order;
const controller = require("./Cart");
const FavouriteProductDB = require("../models").FavouriteProduct;

const controllers = {
  getUserFavProducts: async (req, res) => {
    const currentUser = await req.user;
    FavouriteProductDB.findAll({
      where: {
        UserId: currentUser.id,
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
        console.log(err);
      });
  },
  addFavProduct: async (req, res) => {
    const currentUser = await req.user;
    const id = req.body.id;

    const favProduct = {
      UserId: currentUser.id,
      ProductId: id,
    };

    FavouriteProductDB.create(favProduct)
      .then(() => {
        res
          .status(200)
          .send({ message: "Ati adaugat produsul in lista de favorite!" });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  deleteFavProduct: async (req, res) => {
    const currentUser = await req.user;
    const id = req.params.id;

    FavouriteProductDB.destroy({
      where: {
        UserId: currentUser.id,
        ProductId: id,
      },
    })
      .then((result) => {
        res
          .status(200)
          .send({ message: "Ati eliminat produsul din lista de favorite!" });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  checkFavProduct: async (req, res) => {
    const currentUser = await req.user;
    const id = req.params.id;

    FavouriteProductDB.findOne({
      where: {
        UserId: currentUser.id,
        ProductId: id,
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
