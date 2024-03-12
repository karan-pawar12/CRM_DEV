import { GETALL_TICKET } from "../../resources/urls/admin";
import axios from '../../Interceptor'

async function getAllTicket_api({ skip, limit, searchQuery, type, priority, status, createdAt }, callback) {
    try {
        let temp = '';

        console.log(createdAt)

        if (searchQuery !== undefined) {
            temp += '&searchQuery=' + searchQuery
        }

        if (type !== undefined) {
            temp += '&type=' + type
        }

        if (status !== undefined) {
            temp += '&status=' + status
        }

        if (priority !== undefined) {
            temp += '&priority=' + priority
        }

        if (createdAt.length !== 0) {
            if (createdAt !== undefined) {
                temp += '&createdAt[]=' + createdAt[0];
            }

            if (createdAt.length == 2) {
                if (createdAt !== undefined) {
                    temp += '&createdAt[]=' + createdAt[1];
                }
            }
        }




        const res = await axios.get(`${GETALL_TICKET}?skip=${skip}&limit=${limit}${temp}`);

        if (res) {
            callback(null, res);
        }

    } catch (error) {
        console.log("Unable to fetch all tickets", error);
        callback(error, null);
    }
}

export default getAllTicket_api;
