const { getTicketmsgModel, getUserModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');
const { upload } = require('../../config/multerConfig');




module.exports = async function (req, res, next) {
    try {
        const { tenantId, _id } = req.payload;
        const TicketMsg = await getTicketmsgModel(tenantId);
        const User = await getUserModel(tenantId);
        let attachments = [];

        let ticketmsg = null;

        upload(req, res, async function (err) {
            if (err) {
                console.log(err.message);
                return res.status(500).end();
            }

            console.log(req.body);

            const { content, msgType, ticketId, selectedEmails } = req.body;





            if (res.req.files.length > 0) {
                for (let i = 0; i < res.req.files.length; i++) {
                    const { originalname, mimetype, filename, size, destination } = res.req.files[i];
                    attachments.push({
                        originalName: originalname,
                        mimeType: mimetype,
                        fileName: filename,
                        size,
                        destination


                    })
                }
            }

            


            let createdBy = _id;

            ticketmsg = await new TicketMsg({
                ticketId: new mongoose.Types.ObjectId(ticketId),
                content: content,
                createdBy: createdBy,
                msgType,
                cc: selectedEmails,
                attachments
            }).save();

            // Fetch the user's name based on _id
            const user = await User.findOne({ _id });
            createdBy =  user.firstName + (user.lastName ? ' ' + user.lastName : '')

            // Send the response with the user's name instead of _id
            const responseData = ({
               ticketId: ticketmsg.ticketId,
               content: ticketmsg.content,
               createdBy:createdBy,
               msgType:ticketmsg.msgType,
               cc:ticketmsg.cc,
               attachments:ticketmsg.attachments
            });


            res.send(responseData)
        });



        // res.send(ticketmsg);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
