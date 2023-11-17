const {getMeetingModel} = require('../../db/tenantDb');
module.exports = async function (req, res, next) {

    try {

        const {tenantId} = req.payload;

        const Meeting = await getMeetingModel(tenantId);

        const { meetingTitle, from, to, participants, participantsReminder, description, updatedBy } = req.body;
        const updatedUser = {
            meetingTitle, from, to, participants, participantsReminder, description, updatedBy
        };

        const options = { new: true };
        const meetings = await Meeting.findByIdAndUpdate(_id, updatedUser, options);

        if (!meetings) {
            return res.status(404).json({ error: 'meetings not found.' });
        }

        res.json(meetings);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}