const User = require('../../schema/user');

module.exports = async function (req, res, next) {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.otp.value !== otp) {
            return res.status(401).json({ error: 'Invalid OTP' });
        }

        //5 minutes check

        res.json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}