const { getTicketModel } = require('../../db/tenantDb');

module.exports = async (req, res, next) => {
    try {
        const { _id, tenantId } = req.payload;
        const { subject, type, status, priority, product, description, assignedTo } = req.body
        const Ticket = await getTicketModel(tenantId);

        let ticket = null;

        ticket = await new Ticket({
            subject,
            type,
            status,
            priority,
            product,
            description,
            assignedTo
        }).save();

        res.status(201).json(ticket);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}