const { getMessageModel, getChatRoomModel } = require('../../db/tenantDb');
const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
    try {
        const { _id, tenantId } = req.payload;
        let { recipients, senderId = _id, content, roomId } = req.body;
        const Message = await getMessageModel(tenantId);
        const Chatroom = await getChatRoomModel(tenantId);

        let chatroomData = Chatroom.findOne({ roomId: roomId });
        let chatroom = null;

        if(!chatroomData.roomId){
            roomId = new mongoose.Types.ObjectId();
            recipients = new mongoose.Types.ObjectId(recipients);
            chatroom = await new Chatroom({roomId,recipients}).save();    
        }

        let message = null;

        // Save the message with the converted recipients
        message = await new Message({ roomId,senderId, content }).save();
        res.status(201).json(message);

        // io.to(recipients)

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
