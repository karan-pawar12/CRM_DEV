const Lead = require('../../schema/lead');

module.exports = async function (req, res, next) {
    try {
        const leads = await Lead.find({});
            
            
        res.json(leads);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}