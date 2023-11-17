const {getMeetingModel} = require('../../db/tenantDb');
module.exports = async function (req, res, next) {
    try {
        const { _id,tenantId } = req.payload;
        const Meeting = await getMeetingModel(tenantId);
        const { meetingTitle, from, to, host= _id, participants, participantsReminder,description,createdBy=_id,updatedBy=_id } = req.body;
        let meeting = null;
        try {

            meeting = await new Meeting({meetingTitle, from, to, host, participants, participantsReminder,description,createdBy,updatedBy}).save();
            res.status(201).json(meeting);
        } catch (error) {
            console.log(error.message);
            return res.status(500).end();
        }


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}