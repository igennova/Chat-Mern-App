const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || username.trim() === "") {
      return res.json({ msg: "Username is required", status: false });
    }
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
      password: hashedpassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect Username", status: false });
    }
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!ispasswordvalid) {
      return res.json({ msg: "Incorrect Password", status: false });
    }
    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarimage = req.body.image;
    const userdata = await User.findByIdAndUpdate(userId, {
      isAvatarimageset: true,
      avatarimage,
    });
    return res.json({
      isSet: userdata.isAvatarimageset,
      image: userdata.avatarimage,
    });
  } catch (ex) {
    next(ex);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarimage",
      "_id",
    ]);
    return res.json(users)
  } catch (ex) {
    next(ex);
  }
};
module.exports = { register, login, setAvatar, getAllUsers };
