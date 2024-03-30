const mongoose = require("mongoose");
const orders = require("./orders.json");
const products = require("./products.json");
const employees = require("./employees.json");
const Order = require("../models/Order");
const Employee = require("../models/Employee");
const Product = require("../models/Product");
const connect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
};
connect()
  .then(async () => {
    await Promise.all(
      employees.map(async (e) => {
        await Employee.create({
          empId: e.Empid,
          password: e.Password,
          username: e.Username,
        });
      })
    );
    await Promise.all(
      products.map(async (p) => {
        await Product.create({
          productQuantity: p.ProductQuantity,
          productCode: p.ProductCode,
          productName: p.ProductName,
          productPrice: p.Product_price,
        });
      })
    );
    await Promise.all(
      orders.map(async (o) => {
        const productId = await Product.findOne({
          productCode: o["Product Code"],
        }).select("_id");
        await Order.create({
          customerNumber: o["CustNo."],
          modeOfPayment: o["ModeOf Payment"],
          orderDate: new Date(),
          orderNumber: o["OrderNo."],
          product: productId,
          productQuantity: o["Product Quantity"],
          totalAmount: o.Total,
        });
      })
    );
  })
  .then(() => {
    console.log("Data seeded");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
