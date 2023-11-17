const {getProjectModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const Project = await getProjectModel(tenantId);
        const project = await Project.find({});
            
            
        res.json(project);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}