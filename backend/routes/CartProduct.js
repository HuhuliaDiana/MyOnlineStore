const express = require("express");
const router = express.Router()
const controllers=require('../controllers').cartProduct
const other=require('../controllers').other

router.patch('/modifyQuantity/:id',other.checkNotAuth, controllers.modifyQuantity)
router.get('/getCartProducts',other.checkNotAuth, controllers.getCartProducts)
router.delete('/deleteCartProduct/:id',other.checkNotAuth,controllers.deleteCartProduct)

module.exports=router