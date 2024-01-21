const express=require("express")
const router=express.Router();
const {register, login,setAvatar, getAllUsers}  = require("../controllers/userController");
console.log(register)
router.post("/register", register)
router.post("/login", login)
router.post("/setavatar/:id",setAvatar)
router.get("/allusers/:id",getAllUsers)
module.exports = router ;