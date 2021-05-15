const ProductDB = require("../models").Product;
const CartProductDB = require("../models").CartProduct;
const CartDB = require("../models").Cart;
const OrderDB = require("../models").Order;
const controller = require("./Cart");

const controllers = {
  getAllOrders: async (req, res) => {
    const orders = await OrderDB.findAll().then((result) => {
      res.status(200).send(result);
    });
  },
  getOrder: async (req, res) => {
    const order = await OrderDB.findByPk(req.params.id).then((result) => {
      res.status(200).send(result);
    });
  },
  orderCart: async (req, res) => {
    const currentUser = await req.user;

    const cart = await controller.getCart(req, res);

    //calc price

    const order = {
      CartId: cart.id,
      town: req.body.town,
      county: req.body.county,
      phone: req.body.phone,
      address: req.body.address,
      price: cart.totalPrice + 17.5,
    };

    OrderDB.create(order)
      .then((myOrder) => {
        res.status(200).send(myOrder);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
  },
};
module.exports = controllers;
