const User = require('../../schema/user'); // Import the User schema
const Role = require('../../schema/role');
const mongoose = require('mongoose')

module.exports = async function (req, res, next) {
    try {
        const { roleId } = req.query; // Assuming you're passing the ID as a URL parameter

        // Use Mongoose's aggregate method to retrieve a lead by its ID
        const role = await Role.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(roleId)
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
                    name: 1,
                    permissions: 1,
                    hirerachy: 1,
                    roleOwner: {
                        $concat: ['$createdByUser.firstName', ' ', '$createdByUser.lastName']
                    },
                    updatedBy: {
                        $concat: ['$updatedByUser.firstName', ' ', '$updatedByUser.lastName']
                    }
                }
            }
        ]);

        if (!role || role.length === 0) {
            return res.status(404).json({ error: 'Role not found.' });
        }

        res.json(role[0]); // Assuming there's only one role with the given ID
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
