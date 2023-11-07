const User = require('../../schema/user');
const generateOtp = require('../../helpers/generateOtp')
const adminPermissions = require('../../config/adminConfig');

module.exports = async function (req, res, next) {
    try {
        console.log(req.body);
        const { firstName, lastName, email, phone, password } = req.body;

        let permissions = adminPermissions;

        if (!checkRequiredFields(firstName, lastName, email, phone, password)) {
            return res.status(400).json({ error: 'Missing required fields' });
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

        const otp = generateOtp();

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            password,
            permissions,
            otp
        });

        // Save the user data to the database
        const result = await newUser.save();

        res.json(result);

    } catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}

function checkRequiredFields(firstName, lastName, email, phone, password) {
    return firstName && lastName && email && phone && password;
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
