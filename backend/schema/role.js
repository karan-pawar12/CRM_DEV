const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: { type: String },
    permissions: { type: Array, default: [] }, // Array of permissions
    hirerachy: { type: String, default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
    softDelete: { type: Boolean, default: false }
}, {
    timestamps: true,
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
