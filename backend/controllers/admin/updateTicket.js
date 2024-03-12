 const {getTicketModel} = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {

    try {
        const {_id:payloadId,tenantId } = req.payload; // Rename _id to payloadId
        let { _id, fieldName, fieldValue } = req.body;
        const Ticket = await getTicketModel(tenantId);

        const ticket = await Ticket.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } });

        const updatedTicket = await Ticket.aggregate([
            {
                $match: { _id: ticket._id }
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
                }
            }
        ]);


        if (updatedTicket.length > 0) {
            res.status(200).json(updatedTicket[0]);
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}