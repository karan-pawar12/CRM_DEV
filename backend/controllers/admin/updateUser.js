const User = require('../../schema/user');

module.exports = async function (req, res, next) {

    try {


        const { _id, firstName, lastName, email, phone, role, managers, createdBy, updatedBy } = req.body;
        const updatedUser = {
            firstName,
            lastName, // Be cautious when updating passwords; you might want to hash it before updating
            email,
            phone,
            role,
            managers,
            createdBy,
            updatedBy,
        };

        const options = { new: true };
        const user = await User.findByIdAndUpdate(_id, updatedUser, options);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json(user);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}