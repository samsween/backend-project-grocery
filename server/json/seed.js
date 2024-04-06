const mongoose = require("mongoose");
const products = require("./products.json");
const users = require("./users.json");
const User = require("../models/User");
const Product = require("../models/Product");
const connect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
};
connect().then(async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await User.create(users);
  await Product.create(products);
  console.log("Data seeded successfully");
  process.exit();
});
