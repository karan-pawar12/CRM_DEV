const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: { type: String },
    description: {type:String, default:null},
    permissions: {type:{}},
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    softDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
});

const Role = mongoose.model('role', roleSchema);

module.exports = Role;
