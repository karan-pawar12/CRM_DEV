import { GETALL_PROJECT } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllProject_api({skip,limit,searchQuery},callback) {
    try {
        let temp = '';

        if(searchQuery !== undefined){
            temp += '&searchQuery=' + searchQuery 
        }

        const res = await axios.get(`${GETALL_PROJECT}?skip=${skip}&limit=${limit}${temp}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all projects", error);
        callback(error,null);
    }
}

export default getAllProject_api;
