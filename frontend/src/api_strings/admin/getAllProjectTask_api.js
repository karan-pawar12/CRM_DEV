import { GETALL_PROJECTTASK } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllProjectTask_api(id,{skip,limit,searchQuery},callback) {
    try {

        const res = await axios.get(`${GETALL_PROJECTTASK}?id=${id}&skip=${skip}&limit=${limit}&searchQuery=${searchQuery}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all tasks", error);
        callback(error,null);
    }
}

export default getAllProjectTask_api;