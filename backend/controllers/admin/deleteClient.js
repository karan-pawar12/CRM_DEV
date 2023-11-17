const {getClientModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const { _id, deleted } = req.body;
        const Client = await getClientModel(tenantId);
        // Update the 'deleted' field based on the value provided
        const update = { deleted };

        // Find and update the user by ID
        const options = { new: true };
        const client = await Client.findByIdAndUpdate(_id, update, options);

        if (!client) {
            return res.status(404).json({ error: 'client not found.' });
        }

        res.json(client);
    } catch (e) {
        console.log('Error:', e);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
