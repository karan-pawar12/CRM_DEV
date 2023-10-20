const User = require('../../schema/user');
const mongoose = require('mongoose')
// const LeadLogs = require('../../methods/leadLogs');

module.exports = async function (req, res, next) {

    try {
        const { _id: payloadId } = req.payload; // Rename _id to payloadId
        let { _id, fieldName, fieldValue } = req.body;

        if (fieldName === "role") {
            fieldValue = new mongoose.Types.ObjectId(fieldValue);
        }

        const user = await User.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } });


        // Call the LeadLogs function and pass the required parameters
        // await LeadLogs(payloadId, lead[fieldName], fieldValue, fieldName);

        res.json(user);
    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}