const {getprojectTaskModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const {id} = req.query;
        const projectTask = await getprojectTaskModel(tenantId);
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;
        let searchQuery = req.query.searchQuery || '';


        if(searchQuery === "undefined" || searchQuery === undefined){
            searchQuery = ''
        }

        const projectTasks = await projectTask.aggregate([
            {
                $match: {
                    $and:[
                        {
                            softDelete: false, 
                            projectId: new mongoose.Types.ObjectId(id)
                        },
                        {
                            $or: [
                                { projectId: { $regex: searchQuery,$options: 'i' } }, 
                                { priority: { $regex:searchQuery, $options: 'i'}},  
                                { taskName: { $regex:searchQuery, $options: 'i'}}  
                            ]
                        }

                    ]
                    
                   
                }
            },
            {
                $skip:skip
            },
            {
                $limit:limit
            },
            {
                $lookup: {
                    from: 'projects', // Name of the 'project' collection
                    localField: 'projectId',
                    foreignField: '_id',
                    as: 'projectData'
                }
            },
            {
                $unwind: '$projectData' // Unwind the array created by $lookup
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
                    assignedTo: 1,
                    projectName: '$projectData.projectName',
                    priority:1,
                    createdBy: {
                        firstName: '$Owner.firstName',
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

        const totalCount = await projectTask.countDocuments({ softDelete: false });

        res.json({projectTasks,totalCount});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}