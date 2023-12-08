const { getTaskModel } = require('../../db/tenantDb');
module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;
        let searchQuery = req.query.searchQuery || '';

        if (searchQuery === "undefined" || searchQuery === undefined) {
            searchQuery = ''
        }

        const Task = getTaskModel(tenantId);

        const tasks = await Task.aggregate([
            {
                $match: {
                    $ans: [
                        {
                            softDelete: false
                        },
                        {
                            $or: [
                                { taskSubject: { $regex: searchQuery, $options: 'i' } },
                                { dueDate: { $regex: searchQuery, $options: 'i' } },
                                { status: { $regex: searchQuery, $options: 'i' } },
                                { priority: { $regex: searchQuery, $options: 'i' } },
                                { participan: { $regex: searchQuery, $options: 'i' } }
                            ]
                        }
                    ]
                }
            },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: 'users',
                    localField: 'participant',
                    foreignField: '_id',
                    as: 'participant'
                }
            },
            {
                $unwind: {
                    path: '$participant',
                    preserveNullAndEmptyArrays: true
                }
            },

        ])

        const totalCount = await Task.countDocuments({ softDelete: false });


        res.json({ tasks, totalCount });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}