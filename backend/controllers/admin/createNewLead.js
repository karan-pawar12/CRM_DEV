const { getLeadModel } = require('../../db/tenantDb');

module.exports = async function (req, res, next) {
    try {
        const { _id, tenantId } = req.payload;
        const Lead = await getLeadModel(tenantId);

        const { firstName, lastName, email, phone, leadSource, leadStatus, companyName, rating, annualRevenue, createdBy = _id, updatedBy = _id, address, description } = req.body;
        let lead = null;

        lead = await new Lead({ firstName, lastName, email, phone, leadSource, leadStatus, companyName, rating, annualRevenue, createdBy, updatedBy, address, description }).save();
        res.status(201).json(lead);

        io.emit('newLeadData',{title:"New Lead",content:`Lead Name: ${lead.firstName} ${lead.lastName} Lead Source: ${lead.leadSource}`,id:new Date()});

        res.status(200).end();

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}