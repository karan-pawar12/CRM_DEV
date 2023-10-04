const User = require('../../schema/user');

module.exports = async function (req, res, next) {
    try {
        const { _id, deleted } = req.body;

        // Update the 'deleted' field based on the value provided
        const update = { deleted };

        // Find and update the user by ID
        const options = { new: true };
        const user = await User.findByIdAndUpdate(_id, update, options);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json(user);
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
};
