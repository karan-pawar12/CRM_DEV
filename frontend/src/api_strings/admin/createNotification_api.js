import { CREATE_NOTIFICATION } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function Createnotification_api(title,content,data,recipients,callback){
    try {
        const res = await axios.post(CREATE_NOTIFICATION,{
            title,content,data,recipients
        })

        if(res){
            callback(null,res);
        }
    } catch (error) {
        console.log("Unable to push notification", error);
        callback(error,null);
    }
}

export default Createnotification_api;