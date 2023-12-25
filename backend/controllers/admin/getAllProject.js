const {getProjectModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;
        let searchQuery = req.query.searchQuery || '';

        if(searchQuery === "undefined" || searchQuery === undefined){
            searchQuery = ''
        }

        const Project = await getProjectModel(tenantId);
        
        const projects = await Project.aggregate([
            {
                $match: {
                    $and:[
                        {
                            softDelete: false, 
                        },
                        {
                            $or: [
                                { projectName: { $regex: searchQuery,$options: 'i' } }, 
                                { startDate: { $regex: searchQuery, $options: 'i' } },
                                { endDate: { $regex:searchQuery, $options: 'i'}},
                                { priority: { $regex:searchQuery, $options: 'i'}},    
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
                    projectName: 1,
                    startDate: 1,
                    endDate: 1,
                    priority: 1,
                    createdBy: {
                        firstName: '$Owner.firstName',
                    }

                }
            }
        ]);

        console.log(projects)
        
        const totalCount = await Project.countDocuments({ softDelete: false });
            
        res.json({projects,totalCount});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}