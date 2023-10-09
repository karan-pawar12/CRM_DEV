import { GETALL_LEAD } from "../../resources/urls/admin";
import axios from "axios";

export default async function getAllLead_api(callback) {
    try {
        const token = localStorage.getItem('token');

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const res = await axios.get(GETALL_LEAD, { headers });

        if(res){
            callback(null,res);
        }
       
    } catch (error) {
        console.log("Unable to fetch all leads", error);
        callback(error,null);
    }
}
