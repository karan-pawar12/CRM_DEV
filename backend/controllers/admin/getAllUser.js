const {getUserModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        let {skip=0,limit=10} = req.query;
        const User = await getUserModel(tenantId);

        const users = await User.aggregate([
            {
                $match: {
                    softDelete: false, 
                    $expr: {
                        $ne: [
                            '$_id', new mongoose.Types.ObjectId(req.payload._id)
                        ]
                    }
                }
            },
            {
                $skip: parseInt(skip)
            },
            {
                $limit: parseInt(limit)
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
            },
            
        ]);

        const totalCount = await User.countDocuments({ softDelete: false });

        res.json({users,totalCount});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
