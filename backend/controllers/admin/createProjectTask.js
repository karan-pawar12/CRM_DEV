const {getprojectTaskModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {

        const { _id,tenantId } = req.payload;
        const { projectId,taskName,startDate,endDate,priority,assignedTo, createdBy = _id, updatedBy = _id, description,status,dependencies } = req.body;
        const Projecttask = await getprojectTaskModel(tenantId);
        let projectTask = null;
        try {

            const participantsObjectIds = assignedTo.map(participant => new mongoose.Types.ObjectId(participant));

            projectTask = await new Projecttask({projectId,taskName,startDate,endDate,priority, assignedTo: participantsObjectIds, createdBy , updatedBy, description,status,dependencies }).save();

            const projectTaskData = await Projecttask.aggregate([
                {
                    $match: { _id: projectTask._id }
                },
                {
                    $lookup: {
                        from: 'projects', 
                        localField: 'projectId',
                        foreignField: '_id',
                        as: 'projectData'
                    }
                },
                {
                    $unwind: '$projectData' 
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'Owner'
                    }
                },
                {
                    $unwind: {
                        path: '$Owner',
                        
                    }
                },
                {
                    $project: {
                        _id: 1,
                        description: 1,
                        taskName:1,
                        status: 1,
                        assignedTo: 1,
                        projectName: '$projectData.projectName',
                        priority:1,
                        createdBy: {
                            firstName: '$Owner.firstName',
                        },
                        dependencies: 1,
                        duration: {
                            $divide: [
                                { $subtract: ['$endDate', '$startDate'] },
                                24 * 60 * 60 * 1000, 
                            ],
                        },
                    }
                }
            ]);

            res.status(201).json(projectTaskData[0]);
        } catch (error) {
            console.log(error.message);
            return res.statusb(500).end();
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}