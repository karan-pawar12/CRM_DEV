const {getUserModel} = require('../../db/tenantDb');

module.exports = async function (req, res, next) {
    let user = null;
    try {
        const { tenantId } = req.payload;
        const { _id, softDelete } = req.body;
        const User = await getUserModel(tenantId);
        const update = { softDelete };

        // Find and update the user by ID
        const options = { new: true };

        user = await User.findByIdAndUpdate(_id, update, options);


        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json(user);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
};
