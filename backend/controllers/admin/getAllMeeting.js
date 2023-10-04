const Meeting = require('../../schema/meeting');

module.exports = async function (req, res, next) {
    try {
        const meetings = await Meeting.find({});
            
            
        res.json(meetings);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}