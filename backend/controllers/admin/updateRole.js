const Role = require('../../schema/role');

module.exports = async function (req, res, next) {
    try {


        const { _id,name,permissions,hirerachy,updatedBy } = req.body;
        const updatedUser = {
            name,permissions,hirerachy,updatedBy
        };

        const options = { new: true };
        const role = await Role.findByIdAndUpdate(_id, updatedUser, options);

        if (!role) {
            return res.status(404).json({ error: 'role not found.' });
        }

        res.json(role);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}