const {getUserModel,getRoleModel} = require('../../db/tenantDb');
const validation = require('../../validations/validators')
const mongoose = require('mongoose')

module.exports = async function (req, res, next) {
    try {
        const { _id,tenantId } = req.payload;
        const { firstName, lastName, password, email, phone, role, managers, createdBy = _id, updatedBy = _id } = req.body;
        const User = await getUserModel(tenantId);
        const Role = await getRoleModel(tenantId);
        let user = null;

        if (!role || role.trim() === '') {
            return res.status(400).json({ error: 'Role is required' });
        }

        if (!validation.isEmailValid(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        if (!validation.isPasswordValid(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        if (await validation.isEmailInUse(email,tenantId)) {
            return res.status(400).json({ error: 'Email address is already in use' });
        }
        

        if (await validation.isPhoneInUse(phone,tenantId)) {
            return res.status(400).json({ error: 'Phone number is already in use' });
        }


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
