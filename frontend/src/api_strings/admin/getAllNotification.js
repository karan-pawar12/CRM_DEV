import { GET_ALLNOTIFICATION } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllNotification_api({skip,limit},callback) {
    try {
        console.log(skip,limit);
        const res = await axios.get(`${GET_ALLNOTIFICATION}?skip=${skip}&limit=${limit}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all notification", error);
        callback(error,null);
    }
}

export default getAllNotification_api;
