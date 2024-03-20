const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/EmployeeController");

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getOneEmployee);

module.exports = router;
