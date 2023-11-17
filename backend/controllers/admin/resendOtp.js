const { getUserModel } = require('../../db/tenantDb');
const generateOtp = require('../../helpers/generateOtp');


module.exports = async function (req, res, next) {
    try {
        const { email,tenantId } = req.body;
        const User = await getUserModel(tenantId);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const currentTime = Date.now(); // Get the current timestamp in milliseconds
        const otpGeneratedAt = user.otp.generatedAt;

        if (currentTime - otpGeneratedAt > global.appConfig.otpExpiryTime * 60 * 1000) {
            return res.status(401).json({ error: 'Please wait till 5 minutes to generate new otp' });
        }

        const newOtp = generateOtp();

        user.otp = {
            value: newOtp.value,
            generatedAt: newOtp.generatedAt,
        };

        await user.save();

        res.json({ message: 'New OTP generated and set successfully' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}