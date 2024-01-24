
const { Message } = require('../models/Message');

const postMessage =async (req, res, next) => {
    const { text } = req.body;
    const userId = req.user.id;

    try {

        const message = await Message.create({
            Text: text,
            userId: userId
        });

        res.status(200).json({ success: true, msg: "message added",message:message.Text });
            
    }
    catch (err) {
        console.log(err);
        res.status(500).json * { success: false, msg: "Internal server error", };
    }
}

const getAllMessages = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const messages = await Message.findAll({ where: { userId: userId } });
        
        res.status(200).json({ success: true, msg: "Messages fetched" , messages:messages});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

module.exports = { postMessage,getAllMessages };