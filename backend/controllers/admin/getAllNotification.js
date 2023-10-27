const Notification = require('../../schema/notification');
const mongoose = require('mongoose');
module.exports = async function (req, res, next) {
    try {
        const { _id, role } = req.payload;
        let notification = null


        if (role[0] === 'admin') {
            notification = await Notification.find({});

        }
        else {
            const recipientId = new mongoose.Types.ObjectId(_id);
             notification = await Notification.find({ recipients: recipientId });

        }

        res.json(notification);

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
