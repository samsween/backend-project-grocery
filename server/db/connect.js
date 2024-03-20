const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
    console.log("Connected to the database");
  } catch (error) {
    console.error("Connection to the database failed", error);
  }
};

module.exports = connectDB;
