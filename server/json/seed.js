const mongoose = require("mongoose");
let products = require("./products.json");
const users = require("./users.json");
const categories = require("./categories.json");
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const connect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
};
connect().then(async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Category.create(categories);
  const cats = await Category.find({});
  products.forEach((product) => {
    product.category = cats[Math.floor(Math.random() * cats.length)]._id;
  });
  await User.create(users);
  await Product.create(products);
  console.log("Data seeded successfully");
  process.exit();
});
