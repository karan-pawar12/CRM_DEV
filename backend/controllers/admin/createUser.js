const User = require('../../schema/user');
const Role = require('../../schema/role')
const mongoose = require('mongoose')

module.exports = async function (req, res, next) {
    try {
        const { _id } = req.payload;
        const { firstName, lastName, password, email, phone, role, managers, createdBy = _id, updatedBy = _id } = req.body;
        let user = null;

        if (!role || role.trim() === '') {
            return res.status(400).json({ error: 'Role is required' });
        }

        if (!isEmailValid(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        if (!isPasswordValid(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }

        if (await isEmailInUse(email)) {
            return res.status(400).json({ error: 'Email address is already in use' });
        }

        if (await isPhoneInUse(phone)) {
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

function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function isPasswordValid(password) {
    return password.length >= 8;
}

async function isEmailInUse(email) {
    const existingUser = await User.findOne({ email: email });
    return !!existingUser;
}

async function isPhoneInUse(phone) {
    const existingPhoneUser = await User.findOne({ phone: phone });
    return !!existingPhoneUser;
}
