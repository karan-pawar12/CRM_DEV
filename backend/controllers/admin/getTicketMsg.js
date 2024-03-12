const { getTicketmsgModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const { tenantId } = req.payload;
        const { ticketId } = req.query;
        const Ticketmsg = await getTicketmsgModel(tenantId);

        const ticketmsg = await Ticketmsg.aggregate([
            {
                $match: {
                    ticketId: new mongoose.Types.ObjectId(ticketId)
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
                    ticketId: 1,
                    content: 1,
                    createdBy: { $arrayElemAt: ['$CreatedByDetails.firstName', 0] },
                    msgType: 1,
                    cc: 1,
                    attachments: 1
                }
            }
        ]);

        res.json(ticketmsg);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}