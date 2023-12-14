const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const projectTaskSchema = new Schema({
    projectName: { type: mongoose.Types.ObjectId, default: null },
    taskName: { type: String },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    priority: { type: String },
    createdBy: { type: mongoose.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Types.ObjectId, default: null },
    participants: { type: Array, default: [] },
    status: { type: String, default:"Open" },
    softDelete: { type: Boolean, default: false }


}, {
    timestamps: true,
});


module.exports = projectTaskSchema;
