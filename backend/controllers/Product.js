const ProductDB = require("../models").Product;
const CartProductDB = require("../models").CartProduct;
const CartDB = require("../models").Cart;
const OrderDB = require("../models").Order;
const UserDB = require("../models").User;
const ViewedProductDB = require("../models").ViewedProduct;
const Sequelize = require("sequelize");
const RatingProductDB = require("../models").RatingProduct;
const ProductSugestionDB = require("../models").ProductSugestion;
const Op = Sequelize.Op;

const controller = require("./Cart");

const controllers = {
  addProduct: async (req, res) => {
    const product = req.body;

    let errors = [];

    if (!product.brand) {
      errors.push("Set a brand for the product!");
    }
    if (!product.price) {
      console.log("Set a price for the product!");
      errors.push("Set a price for the product!");
    }

    if (errors.length === 0) {
      try {
        ProductDB.create(product).then(() =>
          res.status(201).send({ message: "Product succesfully added!" })
        );
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(400).send(errors);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await ProductDB.findAll();
      res.status(200).send(products);
    } catch {
      res.status(500).send({ message: "Server error!" });
    }
  },

  addProductInCart: async (req, res) => {
    const id = req.body.id;
    const product = await ProductDB.findByPk(id);

    const userCart = await controller.getCart(req, res);

    if (product.quantity > 0) {
      const newQuantProd = product.quantity - 1;
      product
        .update({
          quantity: newQuantProd,
        })
        .then((result) => {
          console.log(result);
        });
    }

    try {
      const cartProductFound = await CartProductDB.findOne({
        where: {
          CartId: userCart.id,
          ProductId: product.id,
        },
      });
      console.log(cartProductFound);

      if (cartProductFound) {
        //produsul se afla deja in cos =>  cresc cantitatea cu o unitate

        console.log("produsul se afla in cos");
        const newQuantCartProd = cartProductFound.quantity + 1;
        cartProductFound
          .update({
            quantity: newQuantCartProd,
          })
          .then((result) => {
            res.status(200).send(product);
          });
      } else {
        //produsul nu se afla in cos=>

        console.log("produsul NU se afla in cos");
        //creeaza cartProduct
        const newCartProduct = {
          CartId: userCart.id,
          ProductId: product.id,
        };
        console.log(newCartProduct);

        CartProductDB.create(newCartProduct).then((result) => {
          console.log(newCartProduct);
          res.status(200).send(product);
        });
      }

      //calculeaza pretul cosului de cumparaturi
      const newPrice = userCart.totalPrice + product.price;
      userCart
        .update({
          totalPrice: newPrice,
        })
        .then((result) => {
          console.log(result);
        });
    } catch (err) {
      console.log(err);
    }
  },

  //filtrare produse

  // getBrands: async (req, res) => {
  //   const products = req.body
  //   const brands = products.map((element) => element.brand);
  //   const newBrands = [...new Set(brands)];
  //   res.status(200).send(newBrands);
  // },
  // getRAM: async (req, res) => {
  //   const products = await req.body

  //   const memRAM = products.map((element) => element.memRAM);
  //   const newMemRAM = [...new Set(memRAM)];
  //   res.status(200).send(newMemRAM);
  // },
  // getStock: async (req, res) => {
  //   const products = req.body
  //   const stock = products.map((element) => {
  //     if (element.quantity < 15 && element.quantity > 0) {
  //       return "Stoc limitat";
  //     } else if (element.quantity >= 15) {
  //       return "In stoc";
  //     } else {
  //       return "Stoc epuizat";
  //     }
  //   });
  //   const newStock = [...new Set(stock)];
  //   res.status(200).send(newStock);
  // },
  // getMemInternal: async (req, res) => {
  //   const products = req.body

  //   const memInt = products.map((element) => element.memInternal);
  //   const newMemInt = [...new Set(memInt)];
  //   res.status(200).send(newMemInt);
  // },
  // getNetSpeed: async (req, res) => {
  //   const products = req.body

  //   const netSpeed = products.map((element) => element.netSpeed);
  //   const newNetSpeed = [...new Set(netSpeed)];
  //   res.status(200).send(newNetSpeed);
  // },
  addToViewedProducts: async (req, res) => {
    //se adauga produsul daca el nu se afla deja in ViewedProduct

    const id = req.body.id;
    const currentUser = await req.user;

    const foundProduct = await ViewedProductDB.findOne({
      where: {
        UserId: currentUser.id,
        ProductId: id,
      },
    });

    const viewedProducts = await ViewedProductDB.findAll({
      where: {
        UserId: currentUser.id,
      },
    });

    const ids = viewedProducts.map((product) => product.id);
    if (!foundProduct) {
      const idMin = Math.min(...ids);

      if (viewedProducts.length > 3) {
        ViewedProductDB.destroy({
          where: {
            id: idMin,
          },
        });
      }

      const viewedProduct = {
        UserId: currentUser.id,
        ProductId: id,
      };

      ViewedProductDB.create(viewedProduct)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      res.status(200).send(viewedProducts);
    }
  },

  getLastViewedProducts: async (req, res) => {
    const lastViewedProducts = await ViewedProductDB.findAll({
      include: {
        model: ProductDB,
        as: "Product",
      },
    });
    res.status(200).send(lastViewedProducts);
  },

  getNewProducts: async (req, res) => {
    //returneaza produsele adaugate in ultima luna
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    console.log(d);

    let products = await ProductDB.findAll({
      where: {
        createdAt: {
          [Op.gte]: d,
        },
      },
    });

    res.status(200).send(products);
  },
  getReducedProducts: async (req, res) => {
    let products = await ProductDB.findAll({
      where: {
        discount: {
          [Op.ne]: 0,
        },
      },
    });

    res.status(200).send(products);
  },
  getProduct: async (req, res) => {
    ProductDB.findByPk(req.params.id)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  updateRating: async (req, res) => {
    const currentUser = await req.user;
    const userRating = req.body.rating;
    const ratingProduct = await RatingProductDB.findOne({
      where: {
        ProductId: req.params.id,
        UserId: currentUser.id,
      },
    });

    if (ratingProduct) {
      ratingProduct
        .update({
          rating: userRating,
          UserId: currentUser.id,
        })
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      const newRatingProduct = {
        rating: userRating,
        ProductId: req.params.id,
        UserId: currentUser.id,
      };

      RatingProductDB.create(newRatingProduct)
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  },
  getRatingProduct: async (req, res) => {
    const ratingProducts = await RatingProductDB.findAll({
      where: {
        ProductId: req.params.id,
      },
    });
    const ratings = ratingProducts.map((rp) => rp.rating);

    const rating =
      ratings.reduce(function (acc, val) {
        return acc + val;
      }, 0) / ratings.length;
    res.status(200).send({ rating: rating });
  },

  getUserRatingProduct: async (req, res) => {
    const currentUser = await req.user;
    RatingProductDB.findOne({
      where: {
        UserId: currentUser.id,
        ProductId: req.params.id,
      },
    })
      .then((result) => {
        res.status(200).send({ rating: result.rating });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getNumberRatings: async (req, res) => {
    const id = req.params.id;
    RatingProductDB.findAll({
      where: {
        ProductId: id,
      },
    })
      .then((result) => {
        res.status(200).send({ nrRatings: result.length });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  sendProductSugestion: async (req, res) => {
    const email = req.body.to;
    const productId = req.body.productId;
    const currentUser = await req.user;

    const user = await UserDB.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      const productSugestion = {
        UserId: currentUser.id,
        to: email,
        ProductId: productId,
      };
      ProductSugestionDB.create(productSugestion)
        .then(() => {
          res.status(200).send({ message: "Sugestion sent succesfully!" });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      res.status(400).send({ message: "Email invalid!" });
    }
  },
};
module.exports = controllers;
