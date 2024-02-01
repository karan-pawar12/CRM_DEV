import { GETALL_TICKET } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllTicket_api({skip,limit,searchQuery},callback) {
    try {

        const res = await axios.get(`${GETALL_TICKET}?skip=${skip}&limit=${limit}&searchQuery=${searchQuery}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all tasks", error);
        callback(error,null);
    }
}

export default getAllTicket_api;
