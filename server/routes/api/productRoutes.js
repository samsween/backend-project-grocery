const express = require("express");
const router = express.Router();
const productController = require("../../controllers/ProductController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
