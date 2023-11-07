const User = require('../schema/user')
module.exports.isEmailValid = function(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

module.exports.isPasswordValid = function(password) {
    return password.length >= 8;
}

module.exports.isEmailInUse = async function(email) {
    const existingUser = await User.findOne({ email: email });
    return !!existingUser;
}

module.exports.isPhoneInUse = async function(phone) {
    const existingPhoneUser = await User.findOne({ phone: phone });
    return !!existingPhoneUser;
}
