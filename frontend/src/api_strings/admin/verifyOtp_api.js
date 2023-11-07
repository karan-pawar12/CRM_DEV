import { VERIFY_OTP } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function verifyOtp_api(email,otp,callback){
    try {
        const res = await axios.post(VERIFY_OTP,{
            email,otp
        })

        if(res){
            callback(null,res);
        }

    } catch (error) {
        console.log("Wrong otp or email", error);
        callback(error,null);
    }
}

export default verifyOtp_api;