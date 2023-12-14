const {getprojectTaskModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload
        const { _id, softDelete } = req.body;

        const ProjectTasks = await getprojectTaskModel(tenantId);

        // Update the 'deleted' field based on the value provided
        const update = { softDelete };

        // Find and update the user by ID
        const options = { new: true };
        const projectTask = await ProjectTasks.findByIdAndUpdate(_id, update, options);

        if (!projectTask) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        res.json(projectTask);
    } catch (e) {
        console.log('Error:', e);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
