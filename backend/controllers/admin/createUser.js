const User = require('../../schema/user');
const Role = require('../../schema/role')
const mongoose = require('mongoose')

module.exports = async function (req, res, next) {
    try {
        const { _id } = req.payload;
        const { firstName, lastName, password, email, phone, role, managers, createdBy = _id, updatedBy = _id } = req.body;
        let user = null;
        const roleId = new mongoose.Types.ObjectId(role);
        try {
            user = await new User({ firstName, lastName, password, email, phone, role: roleId, managers, createdBy, updatedBy }).save();
            const roleInfo = await Role.findOne({ _id: roleId });

            if (roleInfo) {
                user.role = roleInfo.name; 
            }

            res.json(user);
        } catch (e) {
            console.log(e.message);
            return res.status(500).end();
        }

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}