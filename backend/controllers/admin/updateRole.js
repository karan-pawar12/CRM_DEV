const Role = require('../../schema/role');

module.exports = async function (req, res, next) {
    try {
        const { _id: payloadId } = req.payload;
        const { _id, fieldName, fieldValue, permissionType, value } = req.body;
        
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

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}