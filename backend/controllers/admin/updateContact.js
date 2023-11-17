const {getContactModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {

    try {
        const {tenantId} = req.payload;

        const { _id, firstName, lastName, email, phone, vendorName, updatedBy, address, description } = req.body;
        const updatedUser = {
            firstName, lastName, email, phone, vendorName, updatedBy, address, description
        };
        const Contact = await getContactModel(tenantId);
        const options = { new: true };
        const contact = await Contact.findByIdAndUpdate(_id, updatedUser, options);

        if (!contact) {
            return res.status(404).json({ error: 'contact not found.' });
        }

        res.json(contact);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}