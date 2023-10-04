const User = require('../../schema/user');
const Role = require('../../schema/role')

module.exports = async function (req, res, next) {
    try {
        const users = await User.find({},"firstName lastName email phone role");
            
            
        res.json(users);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}