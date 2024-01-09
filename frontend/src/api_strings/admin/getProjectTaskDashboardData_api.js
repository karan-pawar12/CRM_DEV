import { GET_PROJECTTASK_DASHBOARD} from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function projectTaskDashboard(id, callback) {
    try {
        

        const res = await axios.get(GET_PROJECTTASK_DASHBOARD + "?projectTaskId=" + id);

        if (res) {
            callback(null, res);
        }
    } catch (error) {
        console.log("Unable to fetch all projects Task", error);
        callback(error, null);
    }
}

export default projectTaskDashboard;