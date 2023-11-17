const {getClientModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const Client = getClientModel(tenantId);
        const client = await Client.find({});
            
            
        res.json(client);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}