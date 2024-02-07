const { getUserModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;

        let {
            searchQuery = undefined
        } = req.query

        let matchQueryStages = [{
            $and: [
                { softDelete: false },
                {
                    $expr: {
                        $ne: [
                            '$_id', new mongoose.Types.ObjectId(req.payload._id)
                        ]
                    }
                }
            ]
        }];

        if (searchQuery !== undefined) {
            matchQueryStages.push({
                $or: [
                    { firstName: { $regex: searchQuery, $options: 'i' } },
                    { lastName: { $regex: searchQuery, $options: 'i' } },
                    { phone: { $regex: searchQuery, $options: 'i' } },
                    { email: { $regex: searchQuery, $options: 'i' } },
                ]
            })
        }

        const User = await getUserModel(tenantId);

        const users = await User.aggregate([
            {
                $match: {
                    $and: matchQueryStages


                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
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
                    role: '$userRole.name'
                }
            },

        ]);

        const totalCount = await User.countDocuments({ softDelete: false });

        res.json({ users, totalCount });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
