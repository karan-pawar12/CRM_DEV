import { GETALL_ROLE } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllRole_api(callback) {
    try {

        const res = await axios.get(GETALL_ROLE);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all roles", error);
        callback(error,null);
    }
}

export default getAllRole_api;
