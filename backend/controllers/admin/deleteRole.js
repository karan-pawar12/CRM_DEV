const {getRoleModel} = require('../../db/tenantDb');

module.exports = async function (req, res, next) {
    try {
        const {tenantId} = req.payload;
        const { _id, softDelete } = req.body;
        const Role = await getRoleModel(tenantId);
        // Update the 'deleted' field based on the value provided
        const update = { softDelete };

        // Find and update the user by ID
        const options = { new: true };
        const role = await Role.findByIdAndUpdate(_id, update, options);

        if (!role) {
            return res.status(404).json({ error: 'role not found.' });
        }

        res.json(role);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ error: 'An error occurred while updating the role.' });
    }
};
