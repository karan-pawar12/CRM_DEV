const User = require('../../schema/user');

module.exports = async function (req, res, next) {
    try {
        const users = await User.find({}, '_id firstName lastName');
        res.json(users);
    } catch (error) {
        console.log(e.message);
        return res.status(500).end();
    }
}
