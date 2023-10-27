const User = require('../../schema/user');
const Role = require('../../schema/role');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const users = await User.aggregate([
            {
                $match: {
                    $expr: {
                        $ne: [
                            '$_id', new mongoose.Types.ObjectId(req.payload._id)
                        ]
                    }
                }
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
                $unwind: {
                    path: '$userRole',
                    preserveNullAndEmptyArrays: true
                }
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
                    }
                }
            }
        ]);

        res.json(users);
    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
};
