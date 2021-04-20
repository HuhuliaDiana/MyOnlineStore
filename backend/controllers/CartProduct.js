const CartProductDB = require("../models").CartProduct;
const ProductDB = require("../models").Product;
const CartDB = require("../models").Cart;
const OrderDB = require("../models").Order;
const controller = require("./Cart");

const controllers = {
  //incearca sa faci aceasta functie din frontend, verifica daca persista datele

  /*decreaseQuantity: async (req, res) => {
    //primesc id-ul cartProduct-ului si trebuie sa gasesc product-ul corespunzator
    const cartProduct = await CartProductDB.findByPk(req.params.id);
    if (cartProduct.quantity > 1) {
      const decreaseQuantity = cartProduct.quantity - 1;
      cartProduct
        .update({
          quantity: decreaseQuantity,
        })
        .then(() => {
          res.status(200).send(cartProduct);
        });
    } else {
      //sterge produsul din bd
      CartProductDB.destroy({
        where: {
          id: req.params.id,
        },
      }).then(() => {
        res.status(200).send({ message: "CartProduct deleted!" });
      });
    }

    //creste cantitatea produsului din ProductDB
    const product = await ProductDB.findOne({
      where: {
        id: cartProduct.ProductId,
      },
    });
    const newQuantity = product.quantity + 1;
    product
      .update({
        quantity: newQuantity,
      })
      .then((result) => {
        res.status(200).send(result);
      });

      //scade valoarea cosului de cumparaturi
      const cart = await controller.getCart(req, res);
      const newPrice=cart.totalPrice-product.price
      cart.update({
        totalPrice: newPrice
        
      }).then((result) => {
        res.status(200).send(result);
      });
      
  },*/

  getCartProducts: async (req, res) => {
    //get cart products from user's cart
    const cart = await controller.getCart(req, res);
    const cartProducts = await CartProductDB.findAll({
      where: {
        CartId: cart.id,
      },
      include:{
        model: ProductDB,
        as: 'Product'

      }
    });

    res.status(200).send(cartProducts);
  },
};
module.exports = controllers;
