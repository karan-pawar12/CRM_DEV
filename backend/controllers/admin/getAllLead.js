const Lead = require('../../schema/lead');

module.exports = async function (req, res, next) {
    try {
    

        // Use Mongoose's select method to retrieve only the specified fields
        const leads = await Lead.find({softDelete: false});

        res.json(leads);

    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
