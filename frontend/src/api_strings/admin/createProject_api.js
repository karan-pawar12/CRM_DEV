import { CREATE_PROJECT } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function CreateProject_api(projectName,participants,createdBy,startDate,endDate,reminder,description,isPrivate,priority,callback) {
    
    try {
        

        const res = await axios.post(CREATE_PROJECT, {
            projectName,participants,createdBy,startDate,endDate,reminder,description,isPrivate,priority
        });

        if(res){
            callback(null,res);
        }

    } catch (error) {
        console.log("Unable to create project", error);
        callback(error,null);
    }
}

export default CreateProject_api;
