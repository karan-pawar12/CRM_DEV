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

        console.log(id);

        if(searchQuery === "undefined" || searchQuery === undefined){
            searchQuery = ''
        }

        const projectTasks = await projectTask.aggregate([
            {
                $match: {
                    $and:[
                        {
                            softDelete: false, 
                            projectName: new mongoose.Types.ObjectId(id)
                        },
                        {
                            $or: [
                                { projectName: { $regex: searchQuery,$options: 'i' } }, 
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
                    localField: 'projectName',
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
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    description: 1,
                    taskName:1,
                    participants: 1,
                    projectName: '$projectData.projectName',
                    priority:1,
                    createdBy: {
                        firstName: '$Owner.firstName',
                    },
                    duration: {
                        $divide: [
                            { $subtract: ['$endDate', '$startDate'] },
                            24 * 60 * 60 * 1000, // Convert milliseconds to days
                        ],
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