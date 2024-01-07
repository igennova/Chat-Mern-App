const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true, // Ensure correct spelling of 'unique'
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 50,
    min: 8,
  },
  isAvatarimageset: {
    type: Boolean,
    default: false,
  },
  avatarimage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", userSchema);
