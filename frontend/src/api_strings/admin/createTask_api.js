import { CREATE_TASK } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function CreateTask_api(taskSubject,dueDate,status,priority,reminder,participant,description,callback) {
    
    try {
        

        const res = await axios.post(CREATE_TASK, {
            taskSubject,dueDate,status,priority,reminder,participant,description
        });

        if(res){
            callback(null,res);
        }

    } catch (error) {
        console.log("Unable to create tasks", error);
        callback(error,null);
    }
}

export default CreateTask_api;
