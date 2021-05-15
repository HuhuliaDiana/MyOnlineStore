const express = require("express");
const router = express.Router();
const controllers = require("../controllers").cart;
const other = require("../controllers").other;

router.get("/getCart", other.checkNotAuth, controllers.getCart);

module.exports = router;
