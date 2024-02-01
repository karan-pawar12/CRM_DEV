const {getTicketModel} = require('../../db/tenantDb');

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const { _id, softDelete } = req.body;
        const Ticket = await getTicketModel(tenantId);
        // Update the 'deleted' field based on the value provided
        const update = { softDelete };

        // Find and update the user by ID
        const options = { new: true };
        const ticket = await Ticket.findByIdAndUpdate(_id, update, options);

        if (!ticket) {
            return res.status(404).json({ error: 'ticket not found.' });
        }

        res.json(ticket);
    } catch (e) {
        console.log('Error:', e);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
