const ProductDB = require("../models").Product;
const CartProductDB = require("../models").CartProduct;
const CartDB = require("../models").Cart;
const ProductSugestionDB = require("../models").ProductSugestion;

const OrderDB = require("../models").Order;
const UserDB = require("../models").User;
const Sequelize = require("sequelize");

const controller = require("./Cart");
const Op = Sequelize.Op;

const controllers = {
  // getAllOrdersComplete: async (req, res) => {
  //   const orders = await OrderDB.findAll();
  //   let idOrders = orders.map((order) => order.id); //1 2
  //   var array = [];

  //   await Promise.all(
  //     idOrders.map(async (id) => {
  //       var order = await OrderDB.findOne(
  //         {
  //           where: {
  //             id: id,
  //           },
  //         },
  //         {
  //           include: {
  //             model: CartDB,
  //             include: {
  //               model: UserDB,
  //               as: "User",
  //             },
  //             as: "Cart",
  //           },
  //         }
  //       );
  //       var products = await CartProductDB.findAll(
  //         {
  //           where: {
  //             CartId: order.CartId,
  //           },
  //         },
  //         {
  //           include: {
  //             model: ProductDB,
  //             as: "Product",
  //           },
  //         }
  //       );
        
  //       products.forEach((product) => {
  //         order=Object.assign(order, product);
  //       });
  //       // let completeOrder = Object.assign(order, products);
  //       array.push(order);
  //     })
  //   );
  //   res.status(200).send(array);
  // },
  getAllOrders: async (req, res) => {
    OrderDB.findAll({
      include: {
        model: CartDB,
        include: {
          model: UserDB,
          as: "User",
        },
        as: "Cart",
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
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
        res.status(500).send(err);
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
    const myOrder = await OrderDB.create(order);

    //ofera discount celor doua persoane

    //mie mi se trimite un produs, eu il comand, deci eu primesc discountul si apoi cealalta persoana

    //1. sugestii pe care le-am primit
    const receivedSuggestions = await ProductSugestionDB.findAll({
      where: {
        //UserId: currentUser.id,
        to: currentUser.email,
        discountUsed: 0, //SUGESTIILE CU PRODUSE NEFOLOSITE PENTRU O COMANDA PE CARE S-A APLICAT DISCOUNT
      },
    });

    //id urile produselor sugerate
    const suggestedProducts = receivedSuggestions.map((suggestion) => {
      return {
        productId: suggestion.ProductId, //1
        userId: suggestion.UserId,
        //to: suggestion.to,//eu
      };
    });

    //vezi daca TO a comandat produsul respectiv (dupa ce user curent a trimis sugestia)
    suggestedProducts.forEach(async (pair) => {
      //gasesc userul care mi-a sugerat
      const user = await UserDB.findOne({
        where: {
          // email: pair.to,
          id: pair.userId, //2
        },
      });

      //orders ale lui TO
      const carts = await CartDB.findAll({
        where: {
          //UserId: user.id,
          UserId: currentUser.id,
        },
      });

      const idCarts = carts.map((cart) => cart.id); //1
      const orderedCarts = await OrderDB.findAll({
        where: {
          CartId: {
            [Op.in]: idCarts, //1
          },
        },
      });
      const idOrderedCarts = orderedCarts.map((order) => order.CartId); //1

      //cauta cartproducts cu cartId in idOrderedCarts and ProductId in = pair.productId
      const cartProducts = await CartProductDB.findAll({
        where: {
          CartId: {
            [Op.in]: idOrderedCarts,
          },
          ProductId: pair.productId,
        },
      });

      if (cartProducts.length > 0) {
        //acorda discount userilor
        const ids = [currentUser.id, user.id]; //eu si cel ce a trimis

        const updates = await UserDB.update(
          {
            discount: 10,
          },
          {
            where: {
              id: ids,
            },
          }
        );
      }
    });

    //discountUsed pe sugestiile cu produsele din cosul actual, pe care il comand acum si de pe urma caruia obtin discountul
    //ca sa nu mai obtin iar discount de pe urma lor

    //produsele din cos
    const cartProducts = await CartProductDB.findAll({
      where: {
        CartId: cart.id,
      },
      include: {
        model: ProductDB,
        as: "Product",
      },
    });
    const idProducts = cartProducts.map((p) => p.Product.id);

    //sugestiile cu produsele respective
    ProductSugestionDB.update(
      {
        discountUsed: 1,
      },
      {
        where: {
          to: currentUser.email,
          ProductId: {
            [Op.in]: idProducts,
          },
        },
      }
    );

    //return your order
    res.status(200).send(myOrder);
  },
};
module.exports = controllers;
