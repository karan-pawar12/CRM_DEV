import { GETALL_ROLE } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllRole_api({skip,limit,searchQuery},callback) {
    try {

        const res = await axios.get(`${GETALL_ROLE}?skip=${skip}&limit=${limit}&searchQuery=${searchQuery}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all roles", error);
        callback(error,null);
    }
}

export default getAllRole_api;
