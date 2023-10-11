import { GET_USER } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function userDetails_api(userId, callback) {
    try {
        
        // Define the query parameters as an object
        const queryParams = {
            _id: userId,
        };

        const res = await axios.get(GET_USER + "?userId=" + userId);

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to fetch all leads", error);
        callback(error, null);
    }
}

export default userDetails_api;