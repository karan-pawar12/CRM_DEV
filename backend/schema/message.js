const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId,primary:true },
    senderId: { type: mongoose.Schema.Types.ObjectId },
    content: { type: String },
}, {
    timestamps: true
});

module.exports = messageSchema;
