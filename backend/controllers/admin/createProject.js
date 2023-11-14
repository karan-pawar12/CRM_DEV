const {getProjectModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {

        const { _id,tenantId } = req.payload;
        const Project = await getProjectModel(tenantId);
        const { projectName, participants, createdBy = _id, updatedBy = _id, startDate, endDate, description, isPrivate, priority, softDelete } = req.body;
        let project = null;
        try {
            project = await new Project({ projectName, participants, createdBy, updatedBy, startDate, endDate, description, isPrivate, priority, softDelete }).save();
            res.json(project);
        } catch (e) {
            console.log(e.message);
            return res.statusb(500).end();
        }

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}