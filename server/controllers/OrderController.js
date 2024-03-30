const Order = require("../models/Order");
const Product = require("../models/Product");

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find({}, { __v: 0 }).populate("product");
      // .select(
      //   "orderNumber orderDate customerNumber productCode productName productPrice productQuantity totalAmount modeOfPayment"
      // );
      console.log(orders);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOneOrder: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate("product");
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = orderController;
