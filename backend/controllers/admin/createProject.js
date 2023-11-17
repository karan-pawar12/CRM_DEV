const {getProjectModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {

        const { _id,tenantId } = req.payload;
        const Project = await getProjectModel(tenantId);
        const { projectName, participants, createdBy = _id, updatedBy = _id, startDate, endDate, description, isPrivate, priority, softDelete } = req.body;
        let project = null;
        try {
            project = await new Project({ projectName, participants, createdBy, updatedBy, startDate, endDate, description, isPrivate, priority, softDelete }).save();
            res.status(201).json(project);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}