const Category = require("../models/Category");

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
  createCategory: async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.json({ success: true, category });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findOneAndDelete({ _id: req.params.id });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
};

module.exports = categoryController;
