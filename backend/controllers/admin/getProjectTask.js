const { getprojectTaskModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const { projectTaskId } = req.query;
        const { tenantId } = req.payload;
        const projectTask = await getprojectTaskModel(tenantId);

        const projecttask = await projectTask.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(projectTaskId)
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projectId',
                    foreignField: '_id',
                    as: 'projectName'
                }
            },
            {
                $unwind: '$projectName' // Unwind the createdByUser array
            },
            {
                $project: {
                    _id: 1,
                    taskName: 1,
                    description: 1,
                    startDate: 1,
                    endDate: 1,
                    priority: 1,
                    assignedTo: 1
                }
            }
        ])

        if (!projecttask || projecttask.length === 0) {
            return res.status(404).json({ error: 'projecttask not found.' });
        }

        res.json(projecttask[0]);


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}