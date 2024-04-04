const express = require("express");
const router = express.Router();
const productController = require("../../controllers/ProductController");
const upload = require("../../middleware/image");
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
router.delete("/:id", productController.deleteProduct);
router.post("/", upload.single("image"), productController.addProduct);
router.put("/:id", upload.single("image"), productController.editProduct);

module.exports = router;
