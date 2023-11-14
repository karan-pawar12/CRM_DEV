const generateOtp = require('../../helpers/generateOtp')
const adminPermissions = require('../../config/adminPermissions');
const { getTenantModel } = require('../../db/adminDb');
const { getUserModel } = require('../../db/tenantDb');

module.exports = async function (req, res, next) {
    const {  email, phone, password,tenantId } = req.body;

    const Tenant = await getTenantModel();

    const User = await getUserModel(tenantId);

    let tenant;
    let user;

    try {
        tenant = await Tenant.findOne({
            $or: [
                { email }, { phone }
            ]
        });

        if (tenant) {
            return res.status(409).end("Tenant already exists");

        } else {

            try {

                if (!checkRequiredFields(email, phone, password,tenantId)) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }

                if (!isEmailValid(email)) {
                    return res.status(400).json({ error: 'Invalid email address' });
                }

                if (!isPasswordValid(password)) {
                    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
                }

                if (await isEmailInUse(email,Tenant)) {
                    return res.status(400).json({ error: 'Email address is already in use' });
                }

                if (await isPhoneInUse(phone,Tenant)) {
                    return res.status(400).json({ error: 'Phone number is already in use' });
                }

                let otp = generateOtp();
                // Create a new user instance
                tenant = await new Tenant({
                    tenantId,
                    email,
                    phone,
                    password,
                }).save();

                user = await new User({
                    firstName:"Admin",
                    email,
                    phone,
                    password,
                    role:"Superadmin",
                    otp,

                }).save();

                res.json(tenant);

            }catch(e){
                return res.status(500).end(e.message);
            }
        }
    }
    catch (e) {
        console.log(e.message);
        return res.status(500).end();
    }
}

function checkRequiredFields( email, phone, password,tenantId) {
    return email && phone && password && tenantId;
}

function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function isPasswordValid(password) {
    return password.length >= 8;
}

async function isEmailInUse(email,User) {
    const existingUser = await User.findOne({ email: email });
    return !!existingUser;
}

async function isPhoneInUse(phone,User) {
    const existingPhoneUser = await User.findOne({ phone: phone });
    return !!existingPhoneUser;
}
