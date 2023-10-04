// controllers/users/login.js
const User = require('../../schema/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {signAccessToken} = require('../../helpers/adminAuthetication')

module.exports = async function (req, res, next) {
    try {
        const { email, password } = req.body;

        // Find the user by their email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const {_id,firstName,lastName,email,phone,role,managers,createdBy,updatedBy} = user;
            // If the passwords match, create a JWT token for authentication
            const token = await signAccessToken({
                _id,firstName,lastName,email,phone,role,managers,createdBy,updatedBy
            })
            
            res.json({token: token,role:role});
        }
        else{
            return res.status(401).json({ error: 'Invalid credentials' });
        }

    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};