const Client = require('../../schema/client');

module.exports = async function (req, res, next) {
    try {
        const client = await Client.find({});
            
            
        res.json(client);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}