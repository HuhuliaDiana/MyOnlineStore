const UserDB = require("../models").User;
const Sequelize = require("sequelize");

const bcrypt = require("bcrypt");
const CartDB = require("../models").Cart;
const OrderDB = require("../models").Order;
const ProductDB = require("../models").Product;

const CartProductDB = require("../models").CartProduct;

const Op = Sequelize.Op;
const controllers = require("./Order");
const controllerCart = require("./Cart");
const ProductSugestionDB = require("../models").ProductSugestion;
const controllerProduct = require("./Product");

const controller = {
  getUserByEmail: async (req, res) => {
    UserDB.findOne({
      where: {
        email: req.params.email,
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send({ message: "Email sau parolă invalidă!" });
      });
  },
  addUser: async (req, res) => {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      username: req.body.username,
      email: req.body.email,
      admin: req.body.admin,
    };

    let errors = [];

    const userByEmail = await UserDB.findOne({
      where: {
        email: user.email,
      },
    });

    if (userByEmail) {
      console.log("You have already an account!");
      errors.push("You have already an account");
    }

    if (
      !user.firstname ||
      !user.lastname ||
      !user.password ||
      !user.email ||
      !user.username
    ) {
      console.log("Empty fields!");
      errors.push("Empty fields!");
    }

    if (user.firstname.length < 2 || user.firstname.length > 25) {
      console.log(
        "Firstame should have more than 2 characters and less than 25!"
      );
      errors.push(
        "Firstame should have more than 2 characters and less than 25!"
      );
    }
    if (user.lastname.length < 2 || user.lastname.length > 25) {
      console.log(
        "Lastame should have more than 2 characters and less than 25!"
      );
      errors.push(
        "Lastame should have more than 2 characters and less than 25!"
      );
    }
    if (user.username.length < 2 || user.username.length > 25) {
      console.log(
        "Username should have more than 2 characters and less than 25!"
      );
      errors.push(
        "Username should have more than 2 characters and less than 25!"
      );
    }
    if (
      !user.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      console.log("Email incorrect!");
      errors.push("Email incorrect!");
    }
    if (user.password.length < 8) {
      console.log("Password should have more than 8 characters!");
      errors.push("Password should have more than 8 characters!");
    }

    if (errors.length === 0) {
      try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        UserDB.create(user).then(() =>
          res.status(201).send({ message: "Succesfully registered!" })
        );
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(400).send(errors);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserDB.findAll();
      res.status(200).send(users);
    } catch {
      res.status(500).send({ message: "Server error!" });
    }
  },

  getCurrentUser: async (req, res) => {
    const currentUser = await req.user;
    res.status(200).send(currentUser);
  },

  verifyExistingThesePersonalData: async (req, res) => {
    UserContactDB.findAll({
      town: req.body.town,
      county: req.body.county,
      phone: req.body.phone,
      address: req.body.address,
      lastname: req.body.lastname,
      firstname: req.body.firstname,
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  editProfile: async (req, res) => {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
    };

    const currentUser = await req.user;
    if (user.firstname !== currentUser.firstname) {
      currentUser
        .update({
          firstname: user.firstname,
        })
        .then(() => {
          console.log("Firstname updated!");
        });
    }
    if (user.username !== currentUser.username) {
      currentUser
        .update({
          username: user.username,
        })
        .then(() => {
          console.log("Username updated!");
        });
    }

    if (user.lastname !== currentUser.lastname) {
      currentUser
        .update({
          lastname: user.lastname,
        })
        .then(() => {
          console.log("Lastname updated!");
        });
    }

    if (user.email !== currentUser.email) {
      currentUser
        .update({
          email: user.email,
        })
        .then(() => {
          console.log("Email updated!");
        });
    }

    res.status(200).send(currentUser);
  },

  getDiscountForSendingSuggestion: async (req, res) => {
    //user trimite sugestie lui user: userId, product: productId
    //daca user a cumparat product: cartProduct: productId= productId, cartId, userId in carts;
    //sugestia trimisa inainte de a se cumpara produsul: productsugestions: userId: userCurent,productId: productId; createdAt> createdAt:order cart unde se afla produsul

    const currentUser = await req.user;
    const sentSuggestions = await ProductSugestionDB.findAll({
      where: {
        UserId: currentUser.id,
      },
    });
    //id urile produselor sugerate de userul curent
    const suggestedProducts = sentSuggestions.map((suggestion) => {
      return {
        productId: suggestion.ProductId,
        to: suggestion.to,
      };
    });

    //vezi daca to a comandat produsul respectiv dupa ce user curent a trimis sugestia
    suggestedProducts.forEach(async (pair) => {
      //find user
      const user = await UserDB.findOne({
        where: {
          email: pair.to,
        },
      });

      //orders ale lui user
      const carts = await CartDB.findAll({
        where: {
          UserId: user.id,
        },
      });

      const idCarts = carts.map((cart) => cart.id);
      const orderedCarts = await OrderDB.findAll({
        where: {
          CartId: {
            [Op.in]: idCarts,
          },
        },
      });
      const idOrderedCarts = orderedCarts.map((order) => order.CartId);

      //cauta cartproducts cu cartId in idOrderedCarts and ProductId in = pair.productId
      const cartProducts = await CartProductDB.findAll({
        where: {
          CartId: {
            [Op.in]: idOrderedCarts,
          },
          ProductId: pair.productId,
        },
      });
      if (cartProducts) {
        //acorda discount userilor
        const ids = [currentUser.id, user.id];
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
  },
  //apply discount
  deleteDiscount: async (req, res) => {
    const currentUser = await req.user;
    UserDB.update(
      {
        discount: 0,
      },
      {
        where: {
          id: currentUser.id,
        },
      }
    )
      .then((result) => {
        res.status(200).send({ message: "Ai aplicat discountul de 10%!" });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  cancelOrder: async (req, res) => {
    const order = await OrderDB.destroy({
      where: {
        id: req.params.id,
      },
    });
    const orders = await controllers.getUserOrders(req, res);
  },

  getEditProduct: async (req, res) => {
    const reqFiles = await req.files;
    console.log(reqFiles);
    await controllerProduct.editProduct(req);
    await controllerProduct.editProduct(req);

    ProductDB.findByPk(req.params.id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
module.exports = controller;
