const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const register = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password:hashedpassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
module.exports = { register };
