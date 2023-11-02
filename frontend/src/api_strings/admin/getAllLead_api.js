import { GETALL_LEAD } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllLead_api({skip,limit},callback) {
    try {

        const res = await axios.get(`${GETALL_LEAD}?skip=${skip}&limit=${limit}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all leads", error);
        callback(error,null);
    }
}

export default getAllLead_api;