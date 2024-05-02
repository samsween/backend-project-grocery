const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const { addImagePath } = require("../utils/imagePaths");

const cartController = {
  getCart: async (req, res) => {
    try {
      const user = await User.findOne({
        _id: req.user.id,
      }).populate("cart.product");
      if (!user)
        return res.status(410).json({ error: "User no longer exists" });
      const cartWithImagePaths = user.cart.map((item) => {
        const { product } = item;
        return { ...item._doc, product: addImagePath(product) };
      });

      res.json(cartWithImagePaths);
    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  },
  addToCart: async (req, res) => {
    try {
      const { productId } = req.body;

      if (!productId)
        return res.status(400).json({ error: "Not enough information" });
      const user = await User.findOne({
        _id: req.user.id,
      }).populate("cart.product");
      if (!user)
        return res.status(410).json({ error: "User no longer exists" });

      const product = await Product.findById(productId).populate("category");
      if (
        user.cart.some((item) => item?.productId.toHexString() == product._id)
      ) {
        user.cart.forEach((item) => {
          if (productId == item.productId.toHexString()) {
            item.quantity += 1;
          }
        });
      } else {
        user.cart.push({
          product: product._id,
          quantity: 1,
          productId: product._id,
        });
      }
      await user.save();
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message, success: false });
    }
  },
  removeFromCart: async (req, res) => {
    const { productId } = req.body;
    if (!productId)
      return res.status(400).json({ error: "Not enough information" });
    try {
      const user = await User.findById(req.user.id);
      // if (!user)
      //   return res.status(410).json({ error: "User no longer exists" });
      // if (
      //   user.cart.some((cart) => cart.productId.toHexString() === productId)
      // ) {
      //   user.cart.forEach((cart) => {
      //     if (cart.productId.toHexString() === productId) {
      //       cart.quantity--;
      //       if (cart.quantity <= 0) {
      //         user.cart = user.cart.filter(
      //           (cart) => cart.productId.toHexString() !== productId
      //         );
      //       }
      //     }
      //   });
      // } else {
      user.cart = user.cart.filter(
        (cart) => cart.productId.toHexString() !== productId
      );
      // }
      await user.save();
      res.json({ success: true, user });
    } catch (err) {
      res.status(500).json({ error: err.message, success: false });
    }
  },
};

module.exports = cartController;
