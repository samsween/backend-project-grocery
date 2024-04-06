const { verifyJwt } = require("../utils/jwt");
require("dotenv").config();
function verifyToken(req, res, next) {
  const token = req.cookies["token"];
  if (!token) return res.status(401).json({ message: "Access denied" });
  try {
    const user = verifyJwt(token);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = verifyToken;
