const {getUserModel,getRoleModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const { userId } = req.query; // Assuming you're passing the ID as a URL parameter
        const User = await getUserModel(tenantId);
        const Role = await getRoleModel(tenantId);
        // Use Mongoose's aggregate method to retrieve a user by its ID
        const roles = await Role.aggregate([
            {
                '$project': {
                    name: '$name',
                    id: "$_id"
                }
            }
        ])
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
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
                    role: 1,
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


        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json({userDetails:user[0],roles}); // Assuming there's only one user with the given ID
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
