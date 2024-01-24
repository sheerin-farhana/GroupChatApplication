
const { Message } = require('../models/Message');

const postMessage =async (req, res, next) => {
    const { text } = req.body;
    const userId = req.user.id;

    try {

        const message = await Message.create({
            Text: text,
            userId: userId
        });

        res.status(200).json({ success: true, msg: "message added" });
            
    }
    catch (err) {
        console.log(err);
        res.status(500).json * { success: false, msg: "Internal server error" };
    }
}

module.exports = { postMessage };