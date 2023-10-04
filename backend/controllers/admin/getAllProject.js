const Project = require('../../schema/project');

module.exports = async function (req, res, next) {
    try {
        const project = await Project.find({});
            
            
        res.json(project);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}