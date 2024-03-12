import { VERIFY_OTP } from "../../resources/urls/admin";
import axios from "../../Interceptor";
import Cookies from 'js-cookie';

async function verifyOtp_api(email, tenantId, password, otp, callback) {
    try {
        const res = await axios.post(VERIFY_OTP, {
            email, tenantId, otp, password
        })

        if (res) {
            const token = res.data.token;
            Cookies.set('token', token, { expires: 7, secure: true });
            callback(null, res);
        }

    } catch (error) {
        console.log("Wrong otp or email", error);
        callback(error, null);
    }
}

export default verifyOtp_api;