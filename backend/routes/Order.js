const express = require("express");
const router = express.Router();
const controllers = require("../controllers").order;
const other = require("../controllers").other;

// router.get("/getAllOrdersComplete", controllers.getAllOrdersComplete);

router.get("/getAllOrders", controllers.getAllOrders);
router.get("/getOrder/:id", controllers.getOrder);
router.post("/orderCart", other.checkNotAuth, controllers.orderCart);
router.get("/getUserOrders", other.checkNotAuth, controllers.getUserOrders);
router.get(
  "/getProductsFromOrder/:id",
  other.checkNotAuth,
  controllers.getProductsFromOrder
);

module.exports = router;
