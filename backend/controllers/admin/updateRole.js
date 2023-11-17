const {getRoleModel} = require('../../db/tenantDb');
module.exports = async function (req, res, next) {
    try {
        const { _id: payloadId,tenantId } = req.payload;
        const { _id, fieldName, fieldValue, permissionType, value } = req.body;
        const Role = await getRoleModel(tenantId);
        let role;

        if (fieldName && fieldValue) {
            const update = { $set: { [fieldName]: fieldValue } };
            role = await Role.findByIdAndUpdate(_id, update,{ new: true });
        } else if (permissionType) {
            const update = {
                $set: {
                    [`permissions.${fieldName}.${permissionType}`]: value,
                },
            };
            role = await Role.findOneAndUpdate({ _id }, update, { new: true });
        } else {
            return res.status(400).json({ error: 'Invalid request.' });
        }

        if (!role) {
            return res.status(404).json({ error: 'Role not found.' });
        }

        res.status(200).json(role);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}