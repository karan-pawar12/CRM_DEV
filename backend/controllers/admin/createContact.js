const {getContactModel} = require('../../db/tenantDb')
module.exports = async function (req, res, next) {
    try {
        const { _id,tenantId } = req.payload;
        const Contact = await getContactModel(tenantId);
        const {firstName,lastName,email,phone,vendorName,createdBy=_id,updatedBy=_id,address,description } = req.body;
        let contact = null;
        try {
            contact = await new Contact({ firstName,lastName,email,phone,vendorName,createdBy,updatedBy,address,description }).save();
            res.status(201).json(contact);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}