const connect = require("../db/connect");
const User = require("../models/User");
const Product = require("../models/Product");

const getProducts = async () => {
  await connect();
  return Product.find();
};

const getUsers = async () => {
  await connect();
  return User.find();
};

const getUser = async (id) => {
  await connect();
  return User.findById(id);
};

const getProduct = async (id) => {
  await connect();
  return Product.findById(id);
};

const createUser = async (user) => {
  await connect();
  return User.create(user);
};

const createProduct = async (product) => {
  await connect();
  return Product.create(product);
};

const updateUser = async (id, user) => {
  await connect();
  return User.findByIdAndUpdate(id, user, { new: true });
};

const updateProduct = async (id, product) => {
  await connect();
  return Product;
};

const deleteUser = async (id) => {
  await connect();
  return User.findByIdAndDelete(id);
};

const deleteProduct = async (id) => {
  await connect();
  return Product.findByIdAndDelete(id);
};

const test = async () => {
  await connect();
  const user = await User.create({
    username: "test",
    firstName: "test",
    lastName: "test",
    email: "test@test.com",
    password: "password",
    role: "customer",
    cart: [],
  });
  console.log(user);
  const product = await Product.create({
    name: "test",
    description: "test",
    image: "test",
    price: 1,
    stockQuantity: 1,
  });
  console.log(product);
};
