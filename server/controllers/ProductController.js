const Product = require("../models/Product");
const fs = require("fs");

const deleteFile = async (filename) => {
  await fs.unlink(filename, (err) => {
    return;
  });
};

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find({}, { __v: 0 });
      const productsWithImagePath = products.map((product) => {
        return {
          ...product._doc,
          imagePath: product.imageName
            ? `http://localhost:3000/images/${product.imageName}`
            : null,
        };
      });
      res.json(productsWithImagePath);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getOneProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const productWithImagePath = {
        ...product._doc,
        imagePath: product.imageName
          ? `http://localhost:3000/images/${product.imageName}`
          : null,
      };
      return res.json(productWithImagePath);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addProduct: async (req, res) => {
    // const imageName = await addImageToS3(req.file.buffer);
    const imageName = req.file.filename;
    console.log(req.file.filename);
    const product = await Product.create({
      productCode: req.body.productCode,
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      imageName: imageName,
    });
    res.json(product);
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
          imageName: imageName,
        }
      );
      res.json(prod);
    } catch (err) {
      return res.json({ error: err });
    }
  },
};

module.exports = productController;
