const {getUserModel} = require('../../db/tenantDb');
const mongoose = require('mongoose')
// const LeadLogs = require('../../methods/leadLogs');

module.exports = async function (req, res, next) {

    try {
        const { _id: payloadId,tenantId } = req.payload; // Rename _id to payloadId
        let { _id, fieldName, fieldValue } = req.body;
        const User = await getUserModel(tenantId);

        if (fieldName === "role") {
            fieldValue = new mongoose.Types.ObjectId(fieldValue);
        }

        const user = await User.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } },{new: true});

        const updatedUser = await User.aggregate([
            {
                $match: { _id: user._id }
            },
            {
                $lookup: {
                    from: 'roles', // Replace with the actual name of the Role collection
                    localField: 'role',
                    foreignField: '_id',
                    as: 'userRole'
                }
            },
            {
                $lookup: {
                    from: 'users', // Replace with the actual name of the User collection
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'createdByUser'
                }
            },
            {
                $lookup: {
                    from: 'users', // Replace with the actual name of the User collection
                    localField: 'updatedBy',
                    foreignField: '_id',
                    as: 'updatedByUser'
                }
            },
            {
                $unwind: {
                    path: '$userRole',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: '$createdByUser' // Unwind the createdByUser array
            },
            {
                $unwind: '$updatedByUser' // Unwind the updatedByUser array
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phone: 1,
                    role: {
                        $ifNull: ['$userRole.name', 'admin']
                    },
                    managers: 1,
                    createdBy: {
                        $concat: ['$createdByUser.firstName', ' ', '$createdByUser.lastName']
                    },
                    updatedBy: {
                        $concat: ['$updatedByUser.firstName', ' ', '$updatedByUser.lastName']
                    }
                }
            }
        ]);

        // Call the LeadLogs function and pass the required parameters
        // await LeadLogs(payloadId, lead[fieldName], fieldValue, fieldName);

        if (updatedUser.length > 0) {
            res.status(200).json(updatedUser[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}