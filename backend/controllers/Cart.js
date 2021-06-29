const CartProductDB = require("../models").CartProduct;
const Sequelize = require("sequelize");
const CartDB = require("../models").Cart;
const UserDB = require("../models").User;
const Op = Sequelize.Op;
const OrderDB = require("../models").Order;
const ProductSugestionDB = require("../models").ProductSugestion;

const controllers = {
  getCart: async (req, res) => {
    const currentUser = await req.user;

    const cart = {
      UserId: currentUser.id,
    };

    const userCarts = await CartDB.findAll({
      where: {
        UserId: currentUser.id,
      },
    });

    if (userCarts.length === 0) {
      const myOwnCart = await CartDB.create(cart);
      return myOwnCart;
    } else {
      const userLastCart = userCarts[userCarts.length - 1];
      const cartInOrders = await OrderDB.findAll({
        where: {
          CartId: userLastCart.id,ș
        },
      });
      if (cartInOrders.length > 0) {
        const myOtherCart = await CartDB.create(cart);
        return myOtherCart;
      } else {
        return userLastCart;
      }
    }
  },
};

module.exports = controllers;
