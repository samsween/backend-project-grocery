const mongoose = require("mongoose");
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

module.exports = mongoose.model("Category", CategorySchema);
