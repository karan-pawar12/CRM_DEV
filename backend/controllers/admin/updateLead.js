const { getLeadModel } = require('../../db/tenantDb');
const LeadLogs = require('../../methods/leadLogs');

module.exports = async function (req, res, next) {

    try {
        const { _id: payloadId,tenantId } = req.payload; // Rename _id to payloadId
        const { _id, fieldName, fieldValue } = req.body;

        const Lead = await getLeadModel(tenantId);


        const lead = await Lead.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } },{new: true});


        // Call the LeadLogs function and pass the required parameters
        await LeadLogs(payloadId, lead[fieldName], fieldValue, fieldName,tenantId);

        res.status(200).json(lead);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}