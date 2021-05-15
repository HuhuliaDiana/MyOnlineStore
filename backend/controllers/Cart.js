const CartProductDB = require("../models").CartProduct;
const ProductDB = require("../models").Product;
const CartDB = require("../models").Cart;
const OrderDB = require("../models").Order;

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

      CartDB.create(cart)
        .then(() => {
          //res.status(200).send({message:"s-a creat primul cos de cumparaturi pt acest user"})
          return cart;
        })
        .catch((err) => {
          res.status(500).send(err);
        });
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
        CartDB.create(cart).then(() => {
          //res.status(201).send(cart)
          return cart;
        });

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
