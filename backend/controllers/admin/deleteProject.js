const Project = require('../../schema/project');

module.exports = async function (req, res, next) {
    try {
        const { _id, deleted } = req.body;

        // Update the 'deleted' field based on the value provided
        const update = { deleted };

        // Find and update the user by ID
        const options = { new: true };
        const project = await Project.findByIdAndUpdate(_id, update, options);

        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        res.json(project);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ error: 'An error occurred while updating the project.' });
    }
};
