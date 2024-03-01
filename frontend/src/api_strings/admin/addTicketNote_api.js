import { ADD_NOTE } from "../../resources/urls/admin";
import axios from "../../Interceptor";

async function addTicketNote_api(data,ticketId,msgType,selectedEmails,callback){
    try {
        const res = await axios.post(ADD_NOTE,{
            data,ticketId,msgType,selectedEmails
        })

        if(res){
            callback(null,res)
        }

    } catch (error) {
        console.log("Unable to ticket msg", error);
        callback(error, null);
    }
}   

export default addTicketNote_api;