const express=require("express")
const router=express.Router();
const {register, login,setAvatar}  = require("../controllers/userController");
console.log(register)
router.post("/register", register)
router.post("/login", login)
router.post("/setavatar/:id",setAvatar)
module.exports = router ;