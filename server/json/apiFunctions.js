const Product = require("../models/Product");
const Category = require("../models/Category");
const connect = require("../db/connect");

connect().then(async () => {
  const prods = await Product.find({}).populate("category");
  const newProdsWithCategory = prods.map((prod) => {
    return {
      name: prod.name,
      description: prod.description,
      image: prod.image,
      price: prod.price,
      stockQuantity: prod.stockQuantity,
      category: prod.category.name,
    };
  });
  console.log(newProdsWithCategory);

  process.exit();
});
