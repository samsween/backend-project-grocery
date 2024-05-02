const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/CartController");
const requireUser = require("../../middleware/requireUser");
router.get("/", requireUser, cartController.getCart);
router.post("/", requireUser, cartController.addToCart);
router.delete("/", requireUser, cartController.removeFromCart);

module.exports = router;
