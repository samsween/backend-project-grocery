const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/OrderController");

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOneOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
