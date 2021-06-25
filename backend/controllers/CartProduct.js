const CartProductDB = require("../models").CartProduct;
const ProductDB = require("../models").Product;
const CartDB = require("../models").Cart;
const OrderDB = require("../models").Order;
const controller = require("./Cart");

const controllers = {
  getProductsFromCart: async (req, res) => {
    CartProductDB.findAll({
      where: {
        CartId: req.params.id,
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
  modifyQuantity: async (req, res) => {
    const new_quantity = req.body.quantity;
    const cart = await controller.getCart(req, res);
    const product = await ProductDB.findByPk(req.params.id);

    //primesc id-ul cartProduct-ului si trebuie sa gasesc product-ul corespunzator
    const cartProduct = await CartProductDB.findOne({
      where: {
        ProductId: req.params.id,
        CartId: cart.id,
      },
    });

    const quantity = cartProduct.quantity;
    // const quantity = product.quantity;

    const diff = quantity - new_quantity;

    const cartProductUpdated = await cartProduct.update({
      quantity: new_quantity,
    });

    const newQuantity = product.quantity + diff;

    const productUpdated = await product.update({
      quantity: newQuantity,
    });

    //modifica valoarea cosului de cumparaturi
    const newPrice =
      cart.totalPrice -
      (product.price - (product.price * product.discount) / 100) * diff;
    const cartUpdated = await cart.update({
      totalPrice: newPrice,
    });
  },

  getCartProducts: async (req, res) => {
    //get cart products from user's cart
    const cart = await controller.getCart(req, res);
    CartProductDB.findAll({
      where: {
        CartId: cart.id,
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

  deleteCartProduct: async (req, res) => {
    //preia produsul
    const cart = await controller.getCart(req, res);
    const cartProduct = await CartProductDB.findOne({
      where: {
        CartId: cart.id,
        id: req.params.id,
      },
    });

    //adauga cantitatea inapoi la produsul initial
    const quantity = cartProduct.quantity;
    const product = await ProductDB.findByPk(cartProduct.ProductId);

    //modific pret cart
    const newPrice =
      cart.totalPrice -
      (product.price - (product.price * product.discount) / 100) * quantity;

    const cartUpdated = await cart.update({
      totalPrice: newPrice,
    });

    //

    const newQuantityProduct = quantity + product.quantity;
    product.update({
      quantity: newQuantityProduct,
    });

    //sterge
    const cartProductDeleted = CartProductDB.destroy({
      where: {
        CartId: cart.id,
        id: req.params.id,
      },
    });
    CartProductDB.findAll({
      where: {
        CartId: cart.id,
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
};
module.exports = controllers;
