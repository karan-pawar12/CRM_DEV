import { useEffect, useState,useContext } from "react";
import { useLocation } from "react-router-dom";
import updateTicket_api from "../../api_strings/admin/updateTicket_api";
import UpdatableElement from "../UpdateForm/UpdatableElement";
import Backbutton from "../Backbutton";
import  getAllUserWithoutskip  from '../../api_strings/admin/getallUserWithoutskip';
import ticketDetails_api from "../../api_strings/admin/ticketDetails_api";
import AdminContext from "../../AdminContext";
const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1";

const typeOptions = [
    { name: "Quetion", id: "Quetion" },
    { name: "Incident", id: "Incident" },
    { name: "Problem", id: "Problem" },
    { name: "Feature Request", id: "Feature Request" },
    { name: "Refund", id: "Refund" },
]

const statusOptions = [
    { name: "Open", id: "Open" },
    { name: "Pending", id: "Pending" },
    { name: "Resolved", id: "Resolved" },
    { name: "Closed", id: "Closed" },
    { name: "Waiting on Customer", id: "Waiting on Customer" },
    { name: "Waiting on Third Party", id: "Waiting on Third Party" }
]

const priorityOptions = [
    { name: "Low", id: "Low" },
    { name: "Medium", id: "Medium" },
    { name: "High", id: "High" },
    { name: "Urgent", id: "Urgent" },
]

export  default function TicketDeails({ onUpdateSuccess }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const admincontext = useContext(AdminContext)

    const [ticketDetailsData, setTicketDetailsData] = useState([]);
    const [userNames, setUsernames] = useState([]);


    useEffect(() => {
        ticketDetails_api(id, (error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {
                setTicketDetailsData(res.data.ticket);
                setUsernames(res.data.users);
                
            }
        })
    }, []);

    console.log(ticketDetailsData);






    return (
        <>
            <Backbutton />
            <div className={`grid w-full ${size} gap-10 mt-6`}>
                <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="subject" fieldValue={ticketDetailsData["subject"]} label="Subject" updateFunction={updateTicket_api} />
                <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="type" fieldValue={ticketDetailsData["type"]} label="Type" updateFunction={updateTicket_api} options={typeOptions} />
                <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="status" fieldValue={ticketDetailsData["status"]} label="Status" updateFunction={updateTicket_api} options={statusOptions} />
                <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="priority" fieldValue={ticketDetailsData["priority"]} label="Priority" updateFunction={updateTicket_api} options={priorityOptions} />
                <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="product" fieldValue={ticketDetailsData["product"]} label="Product" updateFunction={updateTicket_api} />
                <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="description" fieldValue={ticketDetailsData["description"]} label="Description" updateFunction={updateTicket_api} />
                <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="assignedTo" fieldValue={ticketDetailsData["assignedTo"]} label="Assigned To" updateFunction={updateTicket_api}  options={userNames} />
            </div>
        </>
    )
}



