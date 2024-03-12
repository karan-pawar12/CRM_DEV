const { getTicketModel, getTicketmsgModel } = require('../../db/tenantDb');

module.exports = async (req, res, next) => {
    try {
        const { _id, tenantId } = req.payload;
        let { subject, type, status, priority, product, description, assignedTo } = req.body
        const Ticket = await getTicketModel(tenantId);
        const TicketMsg = await getTicketmsgModel(tenantId);

        let ticket = null;

        if (assignedTo.length === 0) {
            assignedTo = null;
        }

        ticket = await new Ticket({
            subject,
            type,
            status,
            priority,
            product,
            assignedTo,
            createdBy: _id
        }).save();

        let ticketmsg = null;


        ticketmsg = await new TicketMsg({
            ticketId: ticket._id,
            content: description,
            createdBy: _id
        }).save();

        res.status(201).json(ticket);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}