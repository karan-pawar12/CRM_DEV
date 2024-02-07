import { GETALL_USER } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllUser_api({skip,limit,searchQuery},callback) {
    try {
        let temp = '';

        if(searchQuery !== undefined){
            temp += '&searchQuery=' + searchQuery 
        }

        const res = await axios.get(`${GETALL_USER}?skip=${skip}&limit=${limit}${temp}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all users", error);
        callback(error,null);
    }
}

export default getAllUser_api;