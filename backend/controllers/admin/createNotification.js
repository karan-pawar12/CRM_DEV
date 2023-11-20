const Notification = require('../../schema/notification');
const mongoose = require("mongoose")
module.exports = async function (req, res, next) {
    try {
        const { _id: payloadId } = req.payload;
        const { title, content, data, recipients, room, priority } = req.body;
        let notification = null;
       
        const recipientIds = recipients.map(recipientId => new mongoose.Types.ObjectId(recipientId));
        
        try {
            notification = await new Notification({ title, content, data, recipients: recipientIds, room, priority }).save();
            res.json(notification);
        } catch (error) {
            console.log(error.message);
            return res.status(500).end();
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).end();
    }
}