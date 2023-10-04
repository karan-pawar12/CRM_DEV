const Client = require('../../schema/client');

module.exports = async function (req, res, next) {
    try {
        const { _id } = req.payload;
        const { companyName, companySite, email, companyPhoneNo, clientPhoneNo, address, industry, annualRevenue, createdBy = _id, updatedBy = _id, description, softDelete } = req.body;
        let client = null;
        try {
            client = await new Client({ companyName, companySite, email, companyPhoneNo, clientPhoneNo, address, industry, annualRevenue, createdBy, updatedBy, description, softDelete }).save();
            res.json(client);
        } catch (e) {
            console.log(e.message);
            return res.status(500).end();
        }

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}