const express = require("express");
const router = express.Router();
const controllers = require("../controllers").product;
const other = require("../controllers").other;

router.post("/addProduct", controllers.addProduct);
// router.patch("/editProduct/:id", controllers.editProduct);
router.get("/getAllProducts", controllers.getAllProducts);
router.post(
  "/addProductInCart",
  other.checkNotAuth,
  controllers.addProductInCart
);
router.post(
  "/addToViewedProducts",
  other.checkNotAuth,
  controllers.addToViewedProducts
);
router.get(
  "/getLastViewedProducts",
  other.checkNotAuth,
  controllers.getLastViewedProducts
);
router.get("/getNewProducts", other.checkNotAuth, controllers.getNewProducts);
router.get(
  "/getReducedProducts",
  other.checkNotAuth,
  controllers.getReducedProducts
);
router.get("/getProduct/:id", other.checkNotAuth, controllers.getProduct);
router.patch("/updateRating/:id", other.checkNotAuth, controllers.updateRating);
router.get(
  "/getRatingProduct/:id",
  other.checkNotAuth,
  controllers.getRatingProduct
);
router.get(
  "/getUserRatingProduct/:id",
  other.checkNotAuth,
  controllers.getUserRatingProduct
);
router.post(
  "/sendProductSugestion",
  other.checkNotAuth,
  controllers.sendProductSugestion
);
router.get(
  "/getNumberRatings/:id",
  other.checkNotAuth,
  controllers.getNumberRatings
);
router.get(
  "/checkIfProductIsNew/:id",
  other.checkNotAuth,
  controllers.checkIfProductIsNew
);

module.exports = router;
