const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },

  firstName: {
    type: String,
  },
  lastName: { type: String },

  password: { type: String },

  phone: { type: String },
  isAdmin:{type:Boolean},
  cart:{type:Object}
});

module.exports = mongoose.model("User", userSchema, "Users");
