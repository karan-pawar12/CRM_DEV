const {getProjectModel} = require('../../db/tenantDb');
const {getUserModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {

        const { _id,tenantId } = req.payload;
        const Project = await getProjectModel(tenantId);
        const User = await getUserModel(tenantId);
        // let user = null;
        const { projectName, participants, createdBy = _id, updatedBy = _id, startDate, endDate, description, isPrivate, priority, softDelete } = req.body;
        let project = null;
        try {
            const participantsObjectIds = participants.map(participant => new mongoose.Types.ObjectId(participant));

            project = await new Project({ projectName, participants:participantsObjectIds, createdBy, updatedBy, startDate, endDate, description, isPrivate, priority, softDelete }).save();

            await User.updateMany(
                { _id: { $in: participants } },
                { $push: { projects: project._id } },
                { new: true }
            );

            const projectData = await Project.aggregate([
                {
                    $match: { _id: project._id }
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
            
            res.status(201).json(projectData[0]);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}