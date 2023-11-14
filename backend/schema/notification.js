const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title: { type: String },
    content: { type: JSON },
    data: { type: String }, // basically we will put moduleType eg Lead,Task
    recipients: { type: Array },
    room: { type: String },
    priority: { type: String }

}, {
    timestamps: true,
})

module.exports = notificationSchema;