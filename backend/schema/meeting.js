const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const meetingSchema = new Schema({
    meetingTitle: { type: String },
    from: { type: Date },
    to: { type: Date },
    host: { type: String },
    participants: { type: Array, default: [] },
    participantsReminder: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    description: { type: String }


}, {
    timestamps: true,
});


const Meeting = mongoose.model('meeting', meetingSchema)

module.exports = Meeting;
