const { getTicketModel, getUserModel } = require('../../db/tenantDb')
const mongoose = require('mongoose')
module.exports = async function (req, res, next) {
    try {
        const { tenantId, role, _id } = req.payload;
        const skip = parseInt(req.query.skip, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;


        let {
            searchQuery = undefined,
            priority = undefined,
            status = undefined,
            type = undefined,
            createdAt = [],
        } = req.query;

        console.log(req.query)



        let matchQueryStages = [
            { softDelete: false }
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

        if (createdAt !== undefined && createdAt.length !== 0) {

            const timestampRange = calculateTimestampRange(createdAt);
            matchQueryStages.push({
                createdAt: { $gte: timestampRange.start, $lte: timestampRange.end }
            });



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
            console.log(role[0])
            if (role[0] === 'Superadmin') {
                tickets = await Ticket.aggregate([
                    {
                        $match: {
                            $and: matchQueryStages
                        }
                    },
                    { $skip: skip },
                    { $limit: limit }
                ])
            }
            else {
                matchQueryStages.push({ assignedTo: new mongoose.Types.ObjectId(_id) })
                tickets = await Ticket.aggregate([
                    {
                        $match: {
                            $and: matchQueryStages
                        }
                    },
                    { $skip: skip },
                    { $limit: limit }
                ])
            }

        } catch (error) {
            console.log(error, 'tickets error')
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

        res.json({ tickets, totalCount, users });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function calculateTimestampRange(option) {
    const now = new Date();
    let start, end;

    if (option.length == 1) {
        switch (option[0]) {
            case 'Today':
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                break;
            case 'Yesterday':
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                break;
            case 'This Week':
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay()); // Set to the start of the week (Sunday)
                startOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 7); // Set to the end of the week (Sunday of next week)
                endOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00
                start = startOfWeek;
                end = endOfWeek;
                break;
            case 'This Month':
                start = new Date(now.getFullYear(), now.getMonth(), 1); // Set to the first day of the month
                end = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Set to the first day of the next month
                break;
            case '60 Days':
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 60);
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                break;
            case '180 Days':
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 180);
                end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                break;
            default:
                start = null;
                end = null;
                break;
        }

        return { start, end };
    }
    else if (option.length == 2) {
        let [fromDate, toDate] = option;
        if (toDate > fromDate) {
            start = new Date(fromDate);
            end = new Date(toDate);
            end.setDate(end.getDate() + 1);

            return { start, end }
        }
        else {
            throw new Error('end date must be greater than start date');
        }
    }


}
