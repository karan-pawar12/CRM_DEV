import { CREATE_MESSAGE } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function Createmessage_api(content,recipients,roomId,callback){
    try {
        const res = await axios.post(CREATE_MESSAGE,{
            recipients,content,roomId
        })

        if(res){
            callback(null,res);
        }
    } catch (error) {
        console.log("Unable to push notification", error);
        callback(error,null);
    }
}

export default Createmessage_api;