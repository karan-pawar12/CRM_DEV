import { GET_PROJECTTASK} from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function projectTaskDetails_api(projectTaskId, callback) {
    try {
        
        // Define the query parameters as an object
        const queryParams = {
            _id: projectTaskId,
        };

        const res = await axios.get(GET_PROJECTTASK + "?projectTaskId=" + projectTaskId);

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to fetch all projects Task", error);
        callback(error, null);
    }
}

export default projectTaskDetails_api;