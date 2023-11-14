const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    title: { type: String },
    isPublished: { type: Boolean },
    startDate: { type: Date },
    endDate: { type: Date },
    createdBy: { type: mongoose.Types.ObjectId },
    updatedBy: { type: mongoose.Types.ObjectId },
    uploadedFileName: { type: String },
    originalFileName: { type: String },
    fileLocation: { type: String }
}, {
    timestamps: true,
})

module.exports = emailSchema;