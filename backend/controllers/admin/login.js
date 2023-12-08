const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateOtp = require('../../helpers/generateOtp');
const adminPermissions = require('../../config/adminPermissions');
const { signAccessToken } = require('../../helpers/adminAuthetication')
const {getUserModel,getRoleModel} = require('../../db/tenantDb')

module.exports = async function (req, res, next) {
    try {
        const { email, password, tenantId } = req.body;

        const User = await getUserModel(tenantId);
        const Role = await getRoleModel(tenantId);


        // Find the user by their email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }

        if (!user.isEmailVerified) {
            const newOtp = generateOtp();
            user.otp = {
                value: newOtp.value,
                generatedAt: newOtp.generatedAt,
            };
            await user.save();
            return res.status(403).json({ error: 'Email is not verified' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const { _id, email, role } = user;
            let permissions;
            if(role[0] === 'Superadmin'){
                permissions = adminPermissions;
            }else{
                let roleData = await Role.findOne({_id:role[0]});
                permissions = roleData.permissions;
            }

            // If the passwords match, create a JWT token for authentication
            const token = await signAccessToken({
                _id, email, role, permissions,tenantId
            })
            res.json({ token: token, role: role[0], permissions });
        }
        else{
            return res.status(401).json({ error: 'Invalid credentials' });
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};