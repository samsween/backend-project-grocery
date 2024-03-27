const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
  empId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    getters: true,
    virtuals: true
  }
});

employeeSchema.methods.comparePassword = function (password) {
  return password === this.password;
};

module.exports = mongoose.model("Employee", employeeSchema);
