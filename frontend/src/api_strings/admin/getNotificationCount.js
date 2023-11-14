import { Notification_Count } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getNotificationCount_api(callback) {
    try {
        const res = await axios.get(`${Notification_Count}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch notification count", error);
        callback(error,null);
    }
}

export default getNotificationCount_api;
