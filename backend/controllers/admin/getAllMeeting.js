const {getMeetingModel} = require('../../db/tenantDb');

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const Meeting = await getMeetingModel(tenantId);
        const meetings = await Meeting.find({});
            
            
        res.json(meetings);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}