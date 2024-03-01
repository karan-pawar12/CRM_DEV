const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    subject: { type: String, required: true },
    type: { type: String },
    status: { type: String },
    priority: { type: String },
    product: { type: String },
    assignedTo: { type: mongoose.Types.ObjectId, default: null },
    softDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
});

module.exports = ticketSchema;
