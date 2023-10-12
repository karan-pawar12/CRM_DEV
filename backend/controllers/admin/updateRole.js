const Role = require('../../schema/role');

module.exports = async function (req, res, next) {
    try {
        const { _id: payloadId } = req.payload; // Rename _id to payloadId
        const { _id, fieldName, fieldValue } = req.body;

        const role = await Role.findByIdAndUpdate(_id, { $set: { [fieldName]: fieldValue } });

        if (!role) {
            return res.status(404).json({ error: 'role not found.' });
        }

        res.json(role);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}