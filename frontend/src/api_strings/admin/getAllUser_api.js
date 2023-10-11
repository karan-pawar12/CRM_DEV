import { GETALL_USER } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllUser_api(callback) {
    try {

        const res = await axios.get(GETALL_USER);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all users", error);
        callback(error,null);
    }
}

export default getAllUser_api;
