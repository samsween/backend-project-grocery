const express = require("express");
const router = express.Router();
const authController = require("../../controllers/AuthController");
const requireUser = require("../../middleware/requireEmployee");
router.post("/login", authController.login);
router.post("/register", authController.register);
router.delete("/logout", authController.logout);
router.get("/me", requireUser, authController.getAuth);

module.exports = router;
