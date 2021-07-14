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
  getLastId: async (req, res) => {
    ProductDB.findAll()
      .then((products) => {
        if (products.length == 0) {
          res.status(200).send({ id: 1 });
        } else {
          res.status(200).send({ id: products[products.length - 1].id + 1 });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  deleteProducts: async (req, res) => {
    //array of json objects, get id from every json obj
    let array = req.body.array;
    array = array.map((obj) => obj.id);

    ProductDB.destroy({
      where: {
        id: {
          [Op.in]: array,
        },
      },
    })
      .then((result) => {
        res.status(200).send({ message: "Produse eliminate!" });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  addProduct: async (req, res) => {
    const reqFiles = await req.files;
    const files = reqFiles.map(function (file) {
      return file.filename;
    });

    const body = await req.body.bodyProduct;
    const bodyProduct = JSON.parse(body);

    const product = {
      brand: bodyProduct.brand,
      quantity: bodyProduct.quantity,
      price: bodyProduct.price,
      model: bodyProduct.model,
      dimensions: bodyProduct.dimensions,
      weight: bodyProduct.weight,
      memRAM: bodyProduct.memRAM,
      memInternal: bodyProduct.memInternal,
      selfieCam: bodyProduct.selfieCam,
      mainCam: bodyProduct.mainCam,
      battery: bodyProduct.battery,
      displayRes: bodyProduct.displayRes,
      displaySize: bodyProduct.displaySize,
      netSpeed: bodyProduct.netSpeed,
      USB: bodyProduct.USB,
      discount: bodyProduct.discount,
      photos: files.toString(),
    };
    console.log(product);

    let errors = [];

    if (errors.length === 0) {
      try {
        ProductDB.create(product).then((result) =>
          res.status(201).send(result)
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
    const cartProductFound = await CartProductDB.findOne({
      where: {
        CartId: userCart.id,
        ProductId: product.id,
      },
    });
    if (cartProductFound) {
      const newQuantCartProd = cartProductFound.quantity + 1;
      cartProductFound
        .update({
          quantity: newQuantCartProd,
        })
        .then((result) => {
          res.status(200).send(product);
        });
    } else {
      const newCartProduct = {
        CartId: userCart.id,
        ProductId: product.id,
      };
      CartProductDB.create(newCartProduct).then((result) => {
        res.status(200).send(product);
      });
    }
    const newPrice =
      userCart.totalPrice +
      (product.price - (product.price * product.discount) / 100);
    userCart
      .update({
        totalPrice: newPrice,
      })
      .then((result) => {
        console.log(result);
      });
  },
  addToViewedProducts: async (req, res) => {
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
    const currentUser = await req.user;
    ViewedProductDB.findAll({
      where: {
        UserId: currentUser.id,
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
        if (result) {
          res.status(200).send({ rating: result.rating });
        } else {
          res.status(200).send({ rating: 0 });
        }
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
  checkIfProductIsNew: async (req, res) => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1);

    ProductDB.findOne({
      where: {
        createdAt: {
          [Op.gte]: d,
        },
        id: req.params.id,
      },
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  sendProductSugestion: async (req, res) => {
    const email = req.body.to;
    const productId = req.body.productId;
    const currentUser = await req.user;
    const note = req.body.note;

    const user = await UserDB.findOne({
      where: {
        email: email,
      },
    });
    //iar produsul nu a mai fost sugerat de catre aceeasi persoana
    const productSuggestedAlready = await ProductSugestionDB.findOne({
      where: {
        to: email,
        UserId: currentUser.id,
        ProductId: productId,
      },
    });
    if (user && user.email !== currentUser.email) {
      if (productSuggestedAlready) {
        res
          .status(400)
          .send({ message: "Produsul poate fi sugerat o singura data!" });
      } else {
        const productSugestion = {
          UserId: currentUser.id,
          to: email,
          ProductId: productId,
          note: note,
        };
        ProductSugestionDB.create(productSugestion)
          .then(() => {
            res.status(200).send({ message: "Sugestion sent succesfully!" });
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    } else {
      res.status(400).send({ message: "Email invalid!" });
    }
  },
  editProduct: async (req) => {
    const newProduct = req.body;
    let attributes = [];

    const prod = await ProductDB.findByPk(req.params.id);
    for (let att in prod.dataValues) {
      if (
        prod[att] !== newProduct[att] &&
        att !== "createdAt" &&
        att !== "updatedAt"
      ) {
        attributes.push(att);
      }
    }
    attributes.forEach(async (att) => {
      await ProductDB.update(
        {
          [att]: newProduct[att],
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    });
  },
};
module.exports = controllers;
