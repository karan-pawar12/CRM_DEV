const {getProjectModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const Project = await getProjectModel(tenantId);
        const project = await Project.find({});
            
            
        res.json(project);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}