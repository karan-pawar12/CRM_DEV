const {getNotificationModel} = require('../../db/tenantDb');
const mongoose = require("mongoose")
module.exports = async function (req, res, next) {
    try {
        const { _id: payloadId,tenantId } = req.payload;
        const Notification = await getNotificationModel(tenantId);
        const { title, content, data, recipients, room, priority } = req.body;
        let notification = null;
       
        const recipientIds = recipients.map(recipientId => new mongoose.Types.ObjectId(recipientId));
        
        try {
            notification = await new Notification({ title, content, data, recipients: recipientIds, room, priority }).save();
            res.status(201).json(notification);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}