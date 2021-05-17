const other = require("./other");
const user = require("./User");
const product=require('./Product')
const cartProduct=require('./CartProduct')
const cart=require('./Cart')
const order=require('./Order')
const userContact=require('./UserContact')
const favProduct=require('./FavouriteProduct')
const productSugestion=require('./ProductSugestion')

const controllers = {
  other,
  user,
  product,
  cart,
  productSugestion,
  favProduct,
  userContact,
  order,
  cartProduct
};

module.exports = controllers;
