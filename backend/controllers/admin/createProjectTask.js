const Projecttask = require('../../schema/projectTask');

module.exports = async function (req, res, next) {
    try {

        const { _id } = req.payload;
        const { projectName, participants, createdBy = _id, updatedBy = _id, description } = req.body;
        let projectTask = null;
        try {
            projectTask = await new Projecttask({ projectName, participants, createdBy, updatedBy , description }).save();
            res.json(projectTask);
        } catch (e) {
            console.log(e.message);
            return res.statusb(500).end();
        }

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}