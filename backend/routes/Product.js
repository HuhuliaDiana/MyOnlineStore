const express = require("express");
const router = express.Router()
const controllers=require('../controllers').product
const other=require('../controllers').other

router.post('/addProduct',controllers.addProduct)
router.get('/getAllProducts',other.checkNotAuth, controllers.getAllProducts)
router.post('/addProductInCart',other.checkNotAuth,controllers.addProductInCart)
// router.get('/getBrands',other.checkNotAuth,controllers.getBrands);
// router.get('/getRAM',other.checkNotAuth,controllers.getRAM);
// router.get('/getNetSpeed',other.checkNotAuth,controllers.getNetSpeed)
// router.get('/getStock',other.checkNotAuth,controllers.getStock)
// router.get('/getMemInternal',other.checkNotAuth,controllers.getMemInternal);
router.post('/addToViewedProducts',other.checkNotAuth,controllers.addToViewedProducts)
router.get('/getLastViewedProducts',other.checkNotAuth,controllers.getLastViewedProducts)
router.get('/getNewProducts',other.checkNotAuth,controllers.getNewProducts)
router.get('/getReducedProducts',other.checkNotAuth,controllers.getReducedProducts)
router.get('/getProduct/:id',other.checkNotAuth,controllers.getProduct)
router.patch('/updateRating/:id',other.checkNotAuth,controllers.updateRating)
router.get('/getRatingProduct/:id',other.checkNotAuth,controllers.getRatingProduct)
router.get('/getUserRatingProduct/:id',other.checkNotAuth,controllers.getUserRatingProduct)
router.post('/sendProductSugestion',other.checkNotAuth,controllers.sendProductSugestion)
module.exports=router