const Lead = require('../../schema/lead');

module.exports = async function (req, res, next) {
    try {
        const { _id, deleted } = req.body;

        // Update the 'deleted' field based on the value provided
        const update = { deleted };

        // Find and update the user by ID
        const options = { new: true };
        const lead = await Lead.findByIdAndUpdate(_id, update, options);

        if (!lead) {
            return res.status(404).json({ error: 'Lead not found.' });
        }

        res.json(lead);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ error: 'An error occurred while updating the lead.' });
    }
};
