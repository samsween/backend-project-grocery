const Employee = require("../models/Employee");
const { signJwt } = require("../utils/jwt");
const authController = {
  register: async (req, res) => {
    try {
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const employee = await Employee.findOne({
        username: req.body.username,
      });
      console.log(employee);
      if (!employee) {
        return res
          .status(400)
          .json({ message: "Incorrect username/password", success: false });
      }
      const validPassword = employee.comparePassword(req.body.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: "Incorrect username/password", success: false });
      }

      // TODO: Add emp role
      const token = signJwt({
        id: employee._id,
        username: employee.username,
      });
      console.log(token);
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: false,
          secure: false,
          maxAge: 1000 * 60 * 60,
        })
        .json({
          id: employee._id,
          username: employee.username,
        });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  logout: (req, res) => {
    res.clearCookie("token").json({ message: "Logged out" });
  },
  getAuth: async (req, res) => {
    res.status(200).json(req.user);
  },
};

module.exports = authController;
