const Sequelize = require("sequelize");
const db = require("../config/db");

const UserModel = require("./User");
const User = UserModel(db, Sequelize);

const ProductModel = require("./Product");
const Product = ProductModel(db, Sequelize);

const CartProductModel = require("./CartProduct");
const CartProduct = CartProductModel(db, Sequelize);

const CartModel = require("./Cart");
const Cart = CartModel(db, Sequelize);

const OrderModel = require("./Order");
const Order = OrderModel(db, Sequelize);

const UserContactModel = require("./UserContact");
const UserContact = UserContactModel(db, Sequelize);

const ViewedProductModel = require("./ViewedProduct");
const ViewedProduct = ViewedProductModel(db, Sequelize);

const FavouriteProductModel = require("./FavouriteProduct");
const FavouriteProduct = FavouriteProductModel(db, Sequelize);

const ProductSugestionModel = require("./ProductSugestion");
const ProductSugestion = ProductSugestionModel(db, Sequelize);

const RatingProductModel = require("./RatingProduct");
const RatingProduct = RatingProductModel(db, Sequelize);
module.exports = {
  User,
  Product,
  CartProduct,
  ProductSugestion,
  Cart,
  Order,
  // NewCategoryProduct,
  RatingProduct,
  ViewedProduct,
  FavouriteProduct,
  UserContact,
  connection: db,
};

//one cart has more cartProducts
Cart.hasMany(CartProduct);
CartProduct.belongsTo(Cart);

//one user has more carts
User.hasMany(Cart);
Cart.belongsTo(User);

//un produs poate corespunde mai multor cartProducts
Product.hasMany(CartProduct);
CartProduct.belongsTo(Product);

//un cart corespunde unei singure comenzi
Cart.hasOne(Order);
Order.belongsTo(Cart);

//one user can have more addresses
User.hasMany(UserContact);
UserContact.belongsTo(User);

//o adresa poate corespunde mai multor comenzi

ViewedProduct.belongsTo(Product);
Product.hasOne(ViewedProduct);

//un user poate vizualiza mai multe produse
User.hasMany(ViewedProduct);
ViewedProduct.belongsTo(User);

//un user poate avea mai multe produse favorite
User.hasMany(FavouriteProduct);
FavouriteProduct.belongsTo(User);

FavouriteProduct.belongsTo(Product);
Product.hasOne(FavouriteProduct);

RatingProduct.belongsTo(Product);
Product.hasOne(RatingProduct);

RatingProduct.belongsTo(User);
User.hasMany(RatingProduct);

//un produs poate fi prezent in mai multe sugestii de produse
Product.hasMany(ProductSugestion);
ProductSugestion.belongsTo(Product);

//un user poate trimite mai multe sugestii de produs
User.hasMany(ProductSugestion);
ProductSugestion.belongsTo(User);
