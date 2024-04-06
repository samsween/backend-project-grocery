const User = require("../models/User");
const { signJwt } = require("../utils/jwt");
const authController = {
  register: async (req, res) => {
    try {
      const User = new User({ ...req.body });
      res.status(201).json({ message: "User created", success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Incorrect username/password", success: false });
      }
      const validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ error: "Incorrect username/password", success: false });
      }
      const token = signJwt({
        id: user._id,
        username: user.username,
        role: user.role,
      });
      return res
        .cookie("token", token, {
          httpOnly: false,
          secure: false,
          maxAge: 1000 * 60 * 60,
        })
        .json({ success: true });
    } catch (error) {
      return res.status(400).json({ error: error.message, success: false });
    }
  },
  logout: (req, res) => {
    res.clearCookie("token").json({ message: "Logged out", success: true });
  },
  getAuth: async (req, res) => {
    res.status(200).json(req.user);
  },
};

module.exports = authController;
