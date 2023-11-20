const Notification = require('../../schema/notification');
const mongoose = require('mongoose');
module.exports = async function (req, res, next) {
    try {
        const { _id, role } = req.payload;
        const {skip=0,limit=10} = req.query
        let skipValue = parseInt(skip)
        let limitValue = parseInt(limit)
        let notifications = null


        if (role[0] === 'admin') {
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

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
