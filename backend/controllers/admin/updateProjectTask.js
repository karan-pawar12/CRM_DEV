// const ProjectTask = require('../../schema/projectTask');
// const projectTaskLogs = require('../../methods/projectTaskLogs');
const {getprojectTaskModel,getprojectTaskLogModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {

    try {
        const { _id: payloadId,tenantId } = req.payload; // Rename _id to payloadId
        let { _id, fieldName, fieldValue } = req.body;
        const ProjectTask = await getprojectTaskModel(tenantId);

        if(fieldName === "status"){
            if(fieldValue === "Open"){
                fieldValue = 0
            }
            else if(fieldValue === "Inprogress"){
                fieldValue = 1
            }
            else{
                fieldValue = 2
            }
        }


        let projectTask = await ProjectTask.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } });

        projectTask = await ProjectTask.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(projectTask._id) }
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
                $unwind: '$Owner'
            },
            {
                $project: {
                    _id: 1,
                    description: 1,
                    taskName: 1,
                    status: 1,
                    assignedTo: 1,
                    projectName: '$projectData.projectName',
                    priority: 1,
                    createdBy: {
                        firstName: '$Owner.firstName',
                        // Add other fields as needed
                    },
                    dependencies: 1,
                    duration: {
                        $ceil: {
                            $divide: [
                                { $subtract: ['$endDate', '$startDate'] },
                                24 * 60 * 60 * 1000, // Convert milliseconds to days
                            ],
                        },
                    },
                }
            }
        ]);


        // Call the LeadLogs function and pass the required parameters
        // await projectTaskLogs(payloadId, projectTask[fieldName], fieldValue, fieldName);

        res.status(200).json(projectTask[0]);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}