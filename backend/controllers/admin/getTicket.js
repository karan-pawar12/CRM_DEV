const { getTicketModel,getUserModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const { ticketId } = req.query;
        const Ticket = await getTicketModel(tenantId);
        const User = await getUserModel(tenantId);

        const ticket = await Ticket.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(ticketId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'CreatedByDetails'
                }
            },
            {
                $project: {
                    _id: 1,
                    subject: 1,
                    type: 1,
                    status: 1,
                    priority: 1,
                    product: 1,
                    assignedTo: 1,
                    createdBy: '$CreatedByDetails.firstName',
                    email: '$CreatedByDetails.email',
                    phone: '$CreatedByDetails.phone'
                }
            }
        ]);

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
                    },
                    email: 1
                }
            }
        ]);

        res.json({ ticket: ticket[0], users });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
