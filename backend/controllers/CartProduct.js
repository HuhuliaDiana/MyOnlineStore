const CartProductDB = require("../models").CartProduct;
const ProductDB = require("../models").Product;
const CartDB = require("../models").Cart;
const OrderDB = require("../models").Order;
const controller = require("./Cart");

const controllers = {
  modifyQuantity: async (req, res) => {
    const new_quantity = req.body.quantity;

    //primesc id-ul cartProduct-ului si trebuie sa gasesc product-ul corespunzator
    const cartProduct = await CartProductDB.findOne({
      where: {
        ProductId: req.params.id,
      },
    });

    const quantity = cartProduct.quantity;
    const diff = quantity - new_quantity;

    cartProduct
      .update({
        quantity: new_quantity,
      })
      .then(() => {
        res.status(200).send(cartProduct);
      });

    //modifica cantitatea produsului din ProductDB
    const product = await ProductDB.findByPk(req.params.id);
    const newQuantity = product.quantity + diff;
    product
      .update({
        quantity: newQuantity,
      })
      .then((result) => {
        res.status(200).send(result);
      });

    //modifica valoarea cosului de cumparaturi
    const cart = await controller.getCart(req, res);
    const newPrice = cart.totalPrice + product.price * diff;
    cart
      .update({
        totalPrice: newPrice,
      })
      .then((result) => {
        res.status(200).send(result);
      });
  },

  getCartProducts: async (req, res) => {
    //get cart products from user's cart
    const cart = await controller.getCart(req, res);
    const cartProducts = await CartProductDB.findAll({
      where: {
        CartId: cart.id,
      },
      include: {
        model: ProductDB,
        as: "Product",
      },
    });

    res.status(200).send(cartProducts);
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
