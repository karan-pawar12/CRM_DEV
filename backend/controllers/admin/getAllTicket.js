const { getTicketModel, getUserModel } = require('../../db/tenantDb')
const mongoose = require('mongoose')
module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;
        
        
        let {
            searchQuery = undefined,
            priority = undefined,
            status = undefined,
            type = undefined
        } = req.query;

        console.log(req.query)



        let matchQueryStages = [
            {softDelete: false}
        ];

        

        if (priority !== undefined) {
            matchQueryStages.push({ priority })
        }

        if (status !== undefined) {
            matchQueryStages.push({ status })
        }

        if (type !== undefined) {
            matchQueryStages.push({ type })
        }

        if (searchQuery !== undefined) {
            matchQueryStages.push({
                $or: [
                    { subject: { $regex: searchQuery, $options: 'i' } },
                    { product: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } }
                ]
            })
        }

        const Ticket = await getTicketModel(tenantId);

        let tickets = null;

        try {
            tickets = await Ticket.aggregate([
                {
                    $match: {
                        $and: matchQueryStages
                    }
                },
                { $skip: skip },
                { $limit: limit }
            ])
        } catch (error) {
            console.log(error,'tickets error')
        }

        const totalCount = await Ticket.countDocuments({ softDelete: false });

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

        res.json({ tickets, totalCount,users });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}