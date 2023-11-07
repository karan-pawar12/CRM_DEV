import { RESEND_OTP } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function resendOtp_api(email,callback){
    try {
        const res = await axios.post(RESEND_OTP,{
            email
        });

        if(res){
            callback(null,res);
        }

    } catch (error) {
        console.log("Unable to generate otp:", error);
        callback(error,null);
    }
}

export default resendOtp_api;