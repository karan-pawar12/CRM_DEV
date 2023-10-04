const Contact = require('../../schema/contact');

module.exports = async function (req, res, next) {

    try {


        const { _id, firstName, lastName, email, phone, vendorName, updatedBy, address, description } = req.body;
        const updatedUser = {
            firstName, lastName, email, phone, vendorName, updatedBy, address, description
        };

        const options = { new: true };
        const contact = await Contact.findByIdAndUpdate(_id, updatedUser, options);

        if (!contact) {
            return res.status(404).json({ error: 'contact not found.' });
        }

        res.json(contact);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}