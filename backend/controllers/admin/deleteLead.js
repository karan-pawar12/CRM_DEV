const {getLeadModel} = require('../../db/tenantDb');

module.exports = async function (req, res, next) {
    let lead = null;
    try {
        const {tenantId} = req.payload;
        const { _id, softDelete } = req.body;
        const Lead = await getLeadModel(tenantId);
        const update = { softDelete };

        // Find and update the user by ID
        const options = { new: true };

        lead = await Lead.findByIdAndUpdate(_id, update, options);


        if (!lead) {
            return res.status(404).json({ error: 'Lead not found.' });
        }

        res.json(lead);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ error: 'An error occurred while updating the lead.' });
    }
};
