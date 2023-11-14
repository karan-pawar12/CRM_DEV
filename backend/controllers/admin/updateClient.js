const {getClientModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {

    try {
        const {tenantId} = req.payload;

        const {_id, companyName, companySite, email, companyPhoneNo, clientPhoneNo, address, industry, annualRevenue, createdBy, updatedBy, description } = req.body;
        const updatedUser = {
            companyName, companySite, email, companyPhoneNo, clientPhoneNo, address, industry, annualRevenue, createdBy, updatedBy, description
        };
        const Client = await getClientModel(tenantId);

        const options = { new: true };
        const client = await Client.findByIdAndUpdate(_id, updatedUser, options);

        if (!client) {
            return res.status(404).json({ error: 'client not found.' });
        }

        res.json(client);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}