const express=require("express")
const router=express.Router();
const {addmsg,getallmsg}  = require("../controllers/messagesController");
router.post("/addmsg/", addmsg)
router.post("/getmsg/", getallmsg)

module.exports = router ;