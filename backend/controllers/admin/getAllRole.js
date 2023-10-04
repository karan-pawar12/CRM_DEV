const Role = require('../../schema/role')

module.exports = async function (req, res, next) {
    try {
        const roles = await Role.find({});
            
            
        res.json(roles);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}