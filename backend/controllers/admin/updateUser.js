const USER = require('../../schema/user');
// const LeadLogs = require('../../methods/leadLogs');

module.exports = async function (req, res, next) {

    try {
        const { _id: payloadId } = req.payload; // Rename _id to payloadId
        const { _id, fieldName, fieldValue } = req.body;

        console.log(_id, fieldName, fieldValue);

        const user = await USER.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } });


        // Call the LeadLogs function and pass the required parameters
        // await LeadLogs(payloadId, lead[fieldName], fieldValue, fieldName);

        res.status(200).end();
    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}