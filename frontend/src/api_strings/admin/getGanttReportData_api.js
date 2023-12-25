import { GET_GANTTREPORTDATA } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getGanttReport_api(id,callback) {
    try {

        const res = await axios.get(`${GET_GANTTREPORTDATA}?id=${id}`);

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all data", error);
        callback(error,null);
    }
}

export default getGanttReport_api;
