const projectTask = require('../../schema/projectTask');

module.exports = async function (req, res, next) {
    try {
        const projectTasks = await projectTask.aggregate([
            {
                $lookup: {
                    from: 'projects', // Name of the 'project' collection
                    localField: 'projectName',
                    foreignField: '_id',
                    as: 'projectData'
                }
            },
            {
                $unwind: '$projectData' // Unwind the array created by $lookup
            },
            {
                $project: {
                    _id: 1,
                    description: 1,
                    participants: 1,
                    projectName: '$projectData.projectName'
                }
            }
        ]);

        res.json(projectTasks);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}