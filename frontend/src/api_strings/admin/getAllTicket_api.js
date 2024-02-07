import { GETALL_TICKET } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllTicket_api({skip,limit,searchQuery,type,priority,status},callback) {
    try {
        let temp = '';
        console.log(searchQuery)
        if(searchQuery !== undefined){
            temp += '&searchQuery=' + searchQuery 
        }

        if(type !== undefined){
            temp += '&type=' + type 
        }

        if(status !== undefined){
            temp += '&status=' + status 
        }

        if(priority !== undefined){
            temp += '&priority=' + priority 
        }

        const res = await axios.get(`${GETALL_TICKET}?skip=${skip}&limit=${limit}${temp}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all tasks", error);
        callback(error,null);
    }
}

export default getAllTicket_api;
