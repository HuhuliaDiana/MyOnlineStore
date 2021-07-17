const express = require("express");
const router = express.Router();
const passport = require("passport");
const other = require("../controllers").other;
const controllers = require("../controllers").user;

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/photos");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }); //limits:{filesize: ...}
router.get("/getUserByEmail/:email", controllers.getUserByEmail);
router.post(
  "/getEditProduct/:id",
  upload.array("product", 3),
  controllers.getEditProduct
);

router.delete("/cancelOrder/:id", other.checkNotAuth, controllers.cancelOrder);
router.patch("/editProfile", other.checkNotAuth, controllers.editProfile);
router.get("/getCurrentUser", other.checkNotAuth, controllers.getCurrentUser);
router.get(
  "/getDiscountForSendingSuggestion",
  other.checkNotAuth,
  controllers.getDiscountForSendingSuggestion
);
router.patch("/deleteDiscount", other.checkNotAuth, controllers.deleteDiscount);

router.post("/addUser", controllers.addUser);
router.get("/getAllUsers", other.checkNotAuth, controllers.getAllUsers);

router.delete("/logout", other.checkNotAuth, async (req, res) => {
  req.logOut();
  res.status(200).send({ message: "Logged out" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/fail",
  })
);
router.get("/success", async (req, res) => {
  res.status(200).send(await req.session);
});

router.get("/fail", async (req, res) => {
  res.status(403).send({ message: "Email sau parolă incorectă!" });
});

router.get("/notAuth", async (req, res) => {
  res.status(403).send({ message: "You are not logged in." });
});

router.get("/alreadyAuth", async (req, res) => {
  res.status(403).send({ message: "You are already logged in." });
});

router.get("/logoutInfo", async (req, res) => {
  res.status(403).send({ message: "Succesfully logged out." });
});

router.get("/getUser", async (req, res) => {
  const user = await req.user;
  res.status(200).send(await req.user);
});

module.exports = router;
