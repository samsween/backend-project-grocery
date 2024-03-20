const express = require("express");
const router = express.Router();
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const employeeRoutes = require("./employeeRoutes");

router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/employees", employeeRoutes);

module.exports = router;
