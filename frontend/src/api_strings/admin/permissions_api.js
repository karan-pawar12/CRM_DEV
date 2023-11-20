import { GET_PERMISSIONS } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function permissions_api(callback) {
    try {
        
        const res = await axios.get(GET_PERMISSIONS);

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to fetch permissions", error);
        callback(error, null);
    }
}

export default permissions_api;