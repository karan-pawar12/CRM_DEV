const {getUserModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');
module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const User = await getUserModel(tenantId);
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
                $project: {
                    _id: 0, // Exclude the default _id field
                    id: '$_id', // Rename _id to id
                    name: {
                        $concat: ['$firstName', ' ', '$lastName'] // Concatenate firstName and lastName
                    }
                }
            }
        ]);
        res.json(users);
    } catch (error) {
        console.log(error.message);
        return res.status(500).end();
    }
}
