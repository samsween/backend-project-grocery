const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productCode: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  imageName: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
