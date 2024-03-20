const Employee = require("../models/Employee");

const employeeController = {
  getAllEmployees: async (req, res) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOneEmployee: async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = employeeController;
