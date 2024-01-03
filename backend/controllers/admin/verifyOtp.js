const { getUserModel,getRoleModel } = require('../../db/tenantDb');
const adminPermissions = require('../../config/adminPermissions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signAccessToken } = require('../../helpers/adminAuthetication')

module.exports = async function (req, res, next) {
    try {
        const { email, tenantId, otp, password } = req.body;
        const User = await getUserModel(tenantId);
        const Role = await getRoleModel(tenantId);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.otp.value !== otp) {
            return res.status(401).json({ error: 'Invalid OTP' });
        }

        //5 minutes check
        const currentTime = Date.now(); // Get the current timestamp in milliseconds
        const otpGeneratedAt = user.otp.generatedAt;

        if (currentTime - otpGeneratedAt > global.appConfig.otpExpiryTime * 60 * 1000) {
            return res.status(401).json({ error: 'OTP has expired' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const { _id, email, role } = user;
            let permissions;
            if(!role){
                return res.status(404).json({ error: 'Role is not assigned' });
            }
            else if (role[0] === 'Superadmin') {
                permissions = adminPermissions;
            } else {
                let roleData = await Role.findOne({ _id: role[0] });
                permissions = roleData.permissions;
            }

            // If the passwords match, create a JWT token for authentication
            const token = await signAccessToken({
                _id, email, role, permissions, tenantId
            })

            user.isEmailVerified = true;
            await user.save();

            res.json({ token: token, role: role[0], permissions });
        }
        else{
            return res.status(401).json({ error: 'Wrong Password' });
        }
        
        

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}