import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import updateTicket_api from "../../api_strings/admin/updateTicket_api";
import UpdatableElement from "../UpdateForm/UpdatableElement";
import Backbutton from "../Backbutton";
import ticketDetails_api from "../../api_strings/admin/ticketDetails_api";
import AdminContext from "../../AdminContext";
import { Button } from "@nextui-org/react";
import MailSender from "./MailSender";
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

export default function TicketDeails({ onUpdateSuccess }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const admincontext = useContext(AdminContext)

    const [ticketDetailsData, setTicketDetailsData] = useState([]);
    const [userNames, setUsernames] = useState([]);
    const [isModalOpen,setModalOpen] = useState(false);


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

    const handleModal = () => {
        setModalOpen(prevState => !prevState);
    }





    return (
        <>
            <Backbutton />

            <div className="mt-4 flex flex-col h-screen">
                {/* Header */}
                <header className="flex border-b-2 p-3">
                    <Button className="">Reply</Button>
                    <Button className="ml-3">Add Note</Button>
                    <Button className="ml-3" onClick={handleModal}>Forward</Button>
                    <Button className="ml-3">Close</Button>
                    <Button className="ml-3">Delete</Button>
                </header>

                {/* Main Content */}
                <div className="mt-2 flex relative">
                    {/* Left Content */}
                    <div className="w-[50%] border-3">
                        <h2 className="text-2xl font-bold">{ticketDetailsData.subject}</h2>
                        <div className="flex flex-col gap-4">
                            <div>
                                <p>karan pawar reported via email</p>
                                <p className="font-thin">19 days ago</p>
                            </div>
                            <div>
                                <h3>{ticketDetailsData.description}</h3>
                            </div>
                            <div>
                                <Button className="">Reply</Button>
                                <Button className="ml-3">Add Note</Button>
                                <Button className="ml-3">Forward</Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="border-2 w-[25%]">
                        <h2 className="text-lg">Open ticket status</h2>
                        <div className="mt-6 flex flex-col items-center p-4">
                            <h2 className="text-lg">Properties</h2>
                            <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="subject" fieldValue={ticketDetailsData["subject"]} label="Subject" updateFunction={updateTicket_api} />
                            <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="type" fieldValue={ticketDetailsData["type"]} label="Type" updateFunction={updateTicket_api} options={typeOptions} />
                            <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="status" fieldValue={ticketDetailsData["status"]} label="Status" updateFunction={updateTicket_api} options={statusOptions} />
                            <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="priority" fieldValue={ticketDetailsData["priority"]} label="Priority" updateFunction={updateTicket_api} options={priorityOptions} />
                            <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="product" fieldValue={ticketDetailsData["product"]} label="Product" updateFunction={updateTicket_api} />
                            <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="description" fieldValue={ticketDetailsData["description"]} label="Description" updateFunction={updateTicket_api} />
                            <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="assignedTo" fieldValue={ticketDetailsData["assignedTo"]} label="Assigned To" updateFunction={updateTicket_api} options={userNames} />
                        </div>
                    </div>

                    <div className="border-2 w-[25%]">
                        <h2>CONTACT DETAILS</h2>
                        <div className="flex flex-col h-[200px] border-2">
                            <Link className="text-blue-500 p-3">
                                karan pawar
                            </Link>
                            <div className="flex flex-col mb-2">
                                <label className="font-thin">Email</label>
                                <span className="font-bold">kdpawar752@gmail.com</span>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-thin">Work phone</label>
                                <span className="font-bold">8378907753</span>
                            </div>
                        </div>
                    </div>

       
                        <MailSender isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>
                  
                </div>
            </div>

        </>
    )
}



