import { REPLY_TICKET } from "../../resources/urls/admin";
import axios from '../../Interceptor';

async function forwardTicketMsg_api(data,ticketId,msgType,selectedEmails,callback){
    try {
        const res = await axios.post(REPLY_TICKET,{
            data,ticketId,msgType,selectedEmails
        })

        if(res){
            callback(null,res)
        }

    } catch (error) {
        console.log("Unable to create role", error);
        callback(error, null);
    }
}   

export default forwardTicketMsg_api;