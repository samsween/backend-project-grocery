const Product = require("../models/Product");
const Category = require("../models/Category");
const fs = require("fs");

const deleteFile = async (filename) => {
  await fs.unlink(filename, (err) => {
    return;
  });
};

const productController = {
  getAllProducts: async (req, res) => {
    try {
      console.log(req.query);
      if (req.query.category) {
        const categoryID = await Category.findOne({
          name: req.query.category,
        }).select("_id");
        console.log(categoryID);
        const products = await Product.find({
          category: categoryID._id,
        });
        console.log(products);
        const productsWithImagePath = products.map((product) => {
          return {
            ...product._doc,
            imagePath: product.image
              ? `http://localhost:3000/images/${product.image}`
              : null,
          };
        });
        return res.json(productsWithImagePath);
      }
      const products = await Product.find({}, { __v: 0 });
      const productsWithImagePath = products.map((product) => {
        return {
          ...product._doc,
          imagePath: product.image
            ? `http://localhost:3000/images/${product.image}`
            : null,
        };
      });
      res.json(productsWithImagePath);
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
  getOneProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const productWithImagePath = {
        ...product._doc,
        imagePath: product.image
          ? `http://localhost:3000/images/${product.image}`
          : null,
      };
      return res.json(productWithImagePath);
    } catch (error) {
      return res.status(500).json({ error: error.message, success: false });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted", success: true });
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
  addProduct: async (req, res) => {
    const imageName = req?.file?.filename;
    try {
      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stockQuantity: req.body.stockQuantity,
        image: imageName,
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
  editProduct: async (req, res) => {
    const imageName = req.file?.filename;
    if (imageName) {
      const prevImageName = await Product.findById(req.params.id);
      console.log(prevImageName);
      await deleteFile(`images/${prevImageName.imageName}`);
    }
    const { body } = req;

    try {
      let prod = await Product.updateOne(
        { _id: req.params.id },
        {
          ...body,
          image: imageName,
        }
      );
      res.json(prod);
    } catch (err) {
      return res.json({ error: err.message, success: false });
    }
  },
};

module.exports = productController;
