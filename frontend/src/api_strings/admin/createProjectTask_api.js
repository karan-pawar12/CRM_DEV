import { CREATE_PROJECTTASK } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function CreateProjectTask_api(projectName,taskName,description,startDate,endDate,priority,callback) {
    
    try {
        

        const res = await axios.post(CREATE_PROJECTTASK, {
            projectName,taskName,description,startDate,endDate,priority
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
