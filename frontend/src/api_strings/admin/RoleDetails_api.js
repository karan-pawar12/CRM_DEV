import { GET_ROLE } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function roleDetails_api(roleId, callback) {
    try {
        
        // Define the query parameters as an object
        const queryParams = {
            _id: roleId,
        };

        const res = await axios.get(GET_ROLE + "?roleId=" + roleId);

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to fetch all roles", error);
        callback(error, null);
    }
}

export default roleDetails_api;