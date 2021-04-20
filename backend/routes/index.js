const express = require('express');
const router = express.Router();

const productRouter = require('./Product');
const userRouter = require('./User');
const cartProductRouter = require('./CartProduct');
const cartRouter = require('./Cart');
const orderRouter = require('./Order');
const userContactRouter = require('./UserContact');
const favProductRouter = require('./FavouriteProduct');
const productSugestionRouter=require('./ProductSugestion')

router.use('/', userRouter);
router.use('/', productRouter);
router.use('/', cartProductRouter);
router.use('/', cartRouter);
router.use('/', orderRouter);
router.use('/', userContactRouter);
router.use('/',favProductRouter)
router.use('/',productSugestionRouter)

module.exports = router;

