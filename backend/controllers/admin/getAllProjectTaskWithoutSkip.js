const {getProjectModel} = require('../../db/tenantDb')
const {getprojectTaskModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');


module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const {id} = req.query;
        const projectTask = await getprojectTaskModel(tenantId);
        const Project = await getProjectModel(tenantId);

        const projecttasks = await projectTask.aggregate([
            {
                $match: {
                    softDelete: false,
                    projectId: { $in: [new mongoose.Types.ObjectId(id), null] }
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    id: '$_id', // Rename _id to id
                    name: '$taskName',
                }
            }
        ])

        const participantName = await Project.aggregate([
            {
                $match: {
                    softDelete: false,
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup:{
                    from: 'users',
                    localField:'_id',
                    foreignField: 'projects',
                    as: 'participantNames'
                }
            },
            {
                $unwind: '$participantNames' // Unwind the array created by $lookup
            },
            {
                $project: {
                    _id: 0,
                    id: '$participantNames._id',
                    name: {
                        $concat: [
                            '$participantNames.firstName',
                            ' ',
                            '$participantNames.lastName'
                        ]
                    }
                }
            }
        ])


        res.json({projecttasks,participantName});


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}