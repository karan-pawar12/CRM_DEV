import { GETALL_TASK } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllTask_api({skip,limit,searchQuery},callback) {
    try {

        const res = await axios.get(`${GETALL_TASK}?skip=${skip}&limit=${limit}&searchQuery=${searchQuery}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all tasks", error);
        callback(error,null);
    }
}

export default getAllTask_api;
