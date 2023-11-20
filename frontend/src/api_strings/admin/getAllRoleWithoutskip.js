import { GET_ALLROLEWITHOUTSKIP } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllRoleWithoutskip(callback) {
    try {

        const res = await axios.get(GET_ALLROLEWITHOUTSKIP);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all roles", error);
        callback(error,null);
    }
}

export default getAllRoleWithoutskip;