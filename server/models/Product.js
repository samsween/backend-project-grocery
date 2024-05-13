const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Category",
  },
  featured: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
