const { getUserModel } = require('../../db/tenantDb');

module.exports = async function (req, res, next) {
    try {
        const { email,tenantId, otp } = req.body;
        const User = await getUserModel(tenantId);

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

        user.isEmailVerified = true;
        await user.save();

        res.json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}