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
      //creez un cart

      const myOwnCart = await CartDB.create(cart);
      return myOwnCart;
    } else {
      //iau ultimul cart
      const userLastCart = userCarts[userCarts.length - 1];
      const cartInOrders = await OrderDB.findAll({
        where: {
          CartId: userLastCart.id,
        },
      });
      if (cartInOrders.length > 0) {
        //cartul exista in orders=>

        //creez cart nou
        const myOtherCart = await CartDB.create(cart);
        return myOtherCart;
        //cart-ul nu se gaseste in Order
      } else {
        //returnez cart-ul
        //res.status(201).send(userLastCart)
        return userLastCart;
      }
    }
  },
};

module.exports = controllers;
