const express = require("express");
const router = express.Router()
const controllers=require('../controllers').cart
const other=require('../controllers').other

router.get('/getCart',other.checkNotAuth, controllers.getCart)
router.get('/orderCart',other.checkNotAuth, controllers.orderCart)

module.exports=router