import { CREATE_PROJECTTASK } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function CreateProjectTask_api(projectId,taskName,description,startDate,endDate,priority,dependencies,assignedTo,callback) {
    
    try {
        

        const res = await axios.post(CREATE_PROJECTTASK, {
            projectId,taskName,description,startDate,endDate,priority,dependencies,assignedTo
        });

        if(res){
            callback(null,res);
        }

    } catch (error) {
        console.log("Unable to create project", error);
        callback(error,null);
    }
}

export default CreateProjectTask_api;
