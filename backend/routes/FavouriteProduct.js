const express = require("express");
const router = express.Router()
const controllers=require('../controllers').favProduct
const other=require('../controllers').other

router.get('/getUserFavProducts',other.checkNotAuth,controllers.getUserFavProducts)
router.post('/addFavProduct',other.checkNotAuth,controllers.addFavProduct)
router.delete('/deleteFavProduct/:id',other.checkNotAuth,controllers.deleteFavProduct)
router.get('/checkFavProduct/:id',other.checkNotAuth,controllers.checkFavProduct)



module.exports=router