const Product = require("../models/Product");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({}, { __v: 0 });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOneProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productController;
