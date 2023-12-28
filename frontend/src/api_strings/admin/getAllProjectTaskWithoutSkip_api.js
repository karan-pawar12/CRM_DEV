import { GET_ALLPROJECTTASKWITHOUTSKIP } from "../../resources/urls/admin";
import axios from '../../Interceptor';

async function getAllProjectTaskWithoutskip(id,callback) {
    try {

        const res = await axios.get(`${GET_ALLPROJECTTASKWITHOUTSKIP}?id=${id}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all project task", error);
        callback(error,null);
    }
}

export default getAllProjectTaskWithoutskip;

