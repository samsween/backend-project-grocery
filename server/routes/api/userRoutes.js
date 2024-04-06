const express = require("express");
const router = express.Router();
const userController = require("../../controllers/UserController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
