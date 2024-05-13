const mongoose = require("mongoose");
const Product = require("./Product");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    virtuals: true,
  }
);
CategorySchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    return next();
  }
  this.name = this.name.toLowerCase();
  next();
});
// Delete cateogry from products when category is deleted
CategorySchema.pre("findOneAndDelete", function (next) {
  const categoryId = this.getQuery()["_id"];
  mongoose
    .model("Product")
    .updateMany({ category: categoryId }, { $unset: { category: "" } })
    .then(() => next())
    .catch((err) => next(err));
});

module.exports = mongoose.model("Category", CategorySchema);
