const mongoose = require('mongoose');
const {getNotificationModel} = require('../../db/tenantDb');
module.exports = async function (req, res, next) {
    try {
        const { _id, role,tenantId } = req.payload;
        const Notification = await getNotificationModel(tenantId)


        let totalCount;

        const recipientId = new mongoose.Types.ObjectId(_id);
        totalCount = await Notification.countDocuments({recipients: recipientId});

        res.json({totalCount});

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
