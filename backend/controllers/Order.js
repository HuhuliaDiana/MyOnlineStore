const ProductDB = require("../models").Product;
const CartProductDB = require("../models").CartProduct;
const CartDB = require("../models").Cart;
const OrderDB = require("../models").Order;
const Sequelize = require("sequelize");

const controller = require("./Cart");
const Op = Sequelize.Op;

const controllers = {
  getAllOrders: async (req, res) => {
    OrderDB.findAll().then((result) => {
      res.status(200).send(result);
    });
  },
  getOrder: async (req, res) => {
    OrderDB.findByPk(req.params.id).then((result) => {
      res.status(200).send(result);
    });
  },
  getProductsFromOrder: async (req, res) => {
    const order = await OrderDB.findByPk(req.params.id);
    CartProductDB.findAll({
      where: {
        CartId: order.CartId,
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
  getUserOrders: async (req, res) => {
    const currentUser = await req.user;
    const allOrders = await OrderDB.findAll();
    const cartIds = allOrders.map((order) => order.CartId); //1
    const userCarts = await CartDB.findAll({
      where: {
        UserId: currentUser.id,
      },
    });
    const userCartsIds = userCarts.map((cart) => cart.id); //1 2

    //gaseste id urile carturilor userului
    const filteredArray = cartIds.filter((value) =>
      userCartsIds.includes(value)
    ); //1

    OrderDB.findAll({
      where: {
        CartId: {
          [Op.in]: filteredArray,
        },
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err.message);
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
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      paymentMethod: req.body.paymentMethod,
      price: req.body.price,
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
