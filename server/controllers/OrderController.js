const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find({}, { __v: 0 }).populate([
        "product",
        "user",
      ]);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
  getOneOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate([
        "product",
        "user",
      ]);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.json({ message: "Order deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
};

module.exports = orderController;
