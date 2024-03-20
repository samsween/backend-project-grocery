const express = require("express");
const router = express.Router();
const productController = require("../../controllers/ProductController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);

module.exports = router;
