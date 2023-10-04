const Contact = require('../../schema/contact');

module.exports = async function (req, res, next) {
    try {
        const { _id } = req.payload;
        const {firstName,lastName,email,phone,vendorName,createdBy=_id,updatedBy=_id,address,description } = req.body;
        let contact = null;
        try {
            contact = await new Contact({ firstName,lastName,email,phone,vendorName,createdBy,updatedBy,address,description }).save();
            res.json(contact);
        } catch (e) {
            console.log(e.message);
            return res.status(500).end();
        }

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}