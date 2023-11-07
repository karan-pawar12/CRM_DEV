const User = require('../../schema/user');
const generateOtp = require('../../helpers/generateOtp');

module.exports = async function (req, res, next) {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newOtp = generateOtp();

        user.otp = {
            value: newOtp.value,
            generatedAt: newOtp.generatedAt,
        };

        await user.save();

        res.json({ message: 'New OTP generated and set successfully' });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}