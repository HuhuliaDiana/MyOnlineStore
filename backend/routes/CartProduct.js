const express = require("express");
const router = express.Router()
const controllers=require('../controllers').cartProduct
const other=require('../controllers').other

/*router.delete('/decreaseQuantity/:id',other.checkNotAuth, controllers.decreaseQuantity)*/
router.get('/getCartProducts',other.checkNotAuth, controllers.getCartProducts)

module.exports=router