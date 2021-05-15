const express = require("express");
const router = express.Router();
const controllers = require("../controllers").order;
const other = require("../controllers").other;

router.get("/getAllOrders", controllers.getAllOrders);
router.get("/getOrder/:id", controllers.getOrder);
router.post("/orderCart", other.checkNotAuth, controllers.orderCart);

module.exports = router;
