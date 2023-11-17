const mongoose = require('mongoose');
const {getNotificationModel} = require('../../db/tenantDb');
module.exports = async function (req, res, next) {
    try {
        const { _id, role,tenantId } = req.payload;
        const {skip=0,limit=10} = req.query
        const skipValue = parseInt(skip);
        const limitValue = parseInt(limit);
        const Notification = await getNotificationModel(tenantId)
        let notifications = null


        if (role[0] === 'Superadmin') {
            notifications = await Notification.find({})
            .skip(skipValue)
            .limit(limitValue);
            totalCount = await Notification.countDocuments({});
        }
        else {
            const recipientId = new mongoose.Types.ObjectId(_id);
            notifications = await Notification.find({ recipients: recipientId })
             .skip(skipValue)
             .limit(limitValue);
             totalCount = await Notification.countDocuments({recipients: recipientId});
        }

        res.json({notifications,totalCount});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
