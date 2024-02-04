const messageModel=require("../models/messageModal")
const addmsg=async(req,res,next)=>{
    try{
        const {from,to,message}=req.body;
        const data=await messageModel.create({
            message:{text:message},
            users:{from,to},
            sender:from,
        })
    if (data) return res.json({msg:"message added succesfully"})
    return res.json({msg:"failed sucessfully"})

    }
catch(ex){
    next(ex)
}
}
const getallmsg = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            'users.from': { $in: [from, to] },
            'users.to': { $in: [from, to] }
        }).sort({ updatedAt: 1 });

        const projectmessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });

        res.json(projectmessages);
    } catch (ex) {
        next(ex);
    }
};

module.exports = { addmsg, getallmsg };

module.exports={addmsg,getallmsg}