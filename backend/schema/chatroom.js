const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId },
    recipients: {type: Array, default: null}
  
}, {
    timestamps: true
});

module.exports = chatRoomSchema;

