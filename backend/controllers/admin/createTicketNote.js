const { getTicketmsgModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const { tenantId,_id} = req.payload;
        const { ticketId, data,msgType,selectedEmails } = req.body;
        const TicketMsg = await getTicketmsgModel(tenantId);

        let ticketmsg = null;


        ticketmsg = await new TicketMsg({
            ticketId: new mongoose.Types.ObjectId(ticketId),
            content: data,
            createdBy: _id,
            msgType,
            cc:selectedEmails
        }).save();

       
     
        res.send(ticketmsg);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
