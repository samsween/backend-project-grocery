const express = require("express");
const router = express.Router();
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const employeeRoutes = require("./employeeRoutes");
const authRoutes = require("./authRoutes");
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/employees", employeeRoutes);
router.use("/auth", authRoutes);


module.exports = router;
