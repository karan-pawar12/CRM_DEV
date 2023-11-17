const {getProjectModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {

        const { _id,tenantId } = req.payload;
        const { projectName, participants, createdBy = _id, updatedBy = _id, description } = req.body;
        const Projecttask = await getProjectModel(tenantId);
        let projectTask = null;
        try {
            projectTask = await new Projecttask({ projectName, participants, createdBy, updatedBy , description }).save();
            res.status(201).json(projectTask);
        } catch (error) {
            console.log(error.message);
            return res.statusb(500).end();
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}