import { GET_ALLUSERWITHOUT } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllUserWithoutskip(callback) {
    try {

        const res = await axios.get(GET_ALLUSERWITHOUT);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all users", error);
        callback(error,null);
    }
}

export default getAllUserWithoutskip;