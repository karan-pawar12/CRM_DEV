import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import updateTicket_api from "../../api_strings/admin/updateTicket_api";
import UpdatableElement from "../UpdateForm/UpdatableElement";
import Backbutton from "../Backbutton";
import ticketDetails_api from "../../api_strings/admin/ticketDetails_api";
import ticketmsg_api from "../../api_strings/admin/getTicketMsg_api";
import AdminContext from "../../AdminContext";
import { Button } from "@nextui-org/react";
import { AiOutlineProfile, AiFillForward, AiOutlineCloseCircle, AiOutlineDelete, AiTwotoneInfoCircle } from "react-icons/ai";
import MessageReply from "./MessageReply";
import { CiChat1 } from "react-icons/ci";
import AddNote from "./AddNote";
import ForwardTicket from "./ForwardTicket";
import FileCard from "../FileCards/FileCard";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";


function BorderButton(props) {
    return (
        <Button {...props} variant="bordered" className="bg-white mr-4" color="primary">
            {props.children}
        </Button>
    )
}


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
    const [ticketStatus,setTicketStatus] = useState('');
    const [ticketSubject,setTicketSubject] = useState('');
    const [ticketMsg, setTicketMsg] = useState([])
    const [userNames, setUsernames] = useState([]);
    const [isReplyModalOpen, setReplyModalOpen] = useState(false);
    const [isNoteModalOpen, setNoteModalOpen] = useState(false);
    const [isForwardModalOpen, setForwardModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        ticketDetails_api(id, (error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {
                setTicketDetailsData(res.data.ticket);
                setUsernames(res.data.users);
            }
        });

        ticketmsg_api(id, (error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {
                setTicketMsg(res.data);
            }
        });


    }, []);

    useEffect(() => {
        console.log(typeof(ticketMsg))
    },[ticketMsg])

    const handleReplyModal = () => {
        setReplyModalOpen(prevState => !prevState);
    }

    const handleNoteModal = () => {
        setNoteModalOpen(prevState => !prevState);
    }

    const handleForward = () => {
        setForwardModalOpen(prevState => !prevState);
    }

    const toggleExpandCollapse = () => {
        setIsExpanded(prevState => !prevState);
    };




    return (
        <>
            <Backbutton />

            <div className="mt-4 flex flex-col h-screen">
                <header className="flex border-b-1 p-3 bg-gray-200">
                    <BorderButton className="" onClick={handleReplyModal} >Reply</BorderButton>
                    <BorderButton className="ml-3" onClick={handleNoteModal} startContent={<AiOutlineProfile />}>Add Note</BorderButton>
                    <BorderButton className="ml-3" onClick={handleForward} startContent={<AiFillForward />}>Forward</BorderButton>
                    <BorderButton className="ml-3" startContent={<AiOutlineCloseCircle />}>Close</BorderButton>
                    <BorderButton className="ml-3" startContent={<AiOutlineDelete />}>Delete</BorderButton>
                    <BorderButton isIconOnly onClick={toggleExpandCollapse}>{isExpanded ? <GoSidebarCollapse className="text-xl" /> : <GoSidebarExpand className="text-xl" />}</BorderButton>
                </header>

                <div className="mt-2 flex relative">

                    {/* left content */}
                    <div className={`${isExpanded ? 'w-[50%]' : 'w-[75%]'} border-1 p-2`}>
                        <h2 className="text-2xl font-bold ml-10">{ticketDetailsData.subject}</h2>
                        <div className="flex flex-col gap-4 ml-10">
                            <div>
                                {ticketMsg.length> 0 && ticketMsg?.map((data, index) => {
                                    // Find the user who sent this message
                                    // const createdByUser = ticketMsg?.find(user => user._id === data._id);

                                    return (
                                        <div key={index} className={`items-start mt-4 ${data?.msgType === 'note' ? 'bg-[#FEF1E1] rounded-md p-2' :
                                            data?.msgType === 'reply' ? 'rounded-md p-2' :
                                                data?.msgType === "forward" ? 'bg-[#FEF1E1] rounded-md p-2' : ''}`}>
                                            <div className="flex items-center">
                                                <span className="mr-2 mt-1"><CiChat1 /></span>
                                                <span className="text-blue-600">{data.createdBy}</span>
                                            </div>
                                            <div className={`w-full ml-8 mt-1`}>
                                                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>

                                                {/* Attachments may or may not exist */}
                                                {data.attachments && data.attachments.length > 0 &&
                                                    <div className="w-[100px] mt-3">
                                                        {/* <FileCard name={data.attachments[0].originalName} size={data.attachments[0].size} /> */}
                                                        <a href={`http://localhost:5000/admin/abcd`} download>{data.attachments[0].originalName}</a>
                                                    </div>
                                                }
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>


                            <div>
                                <h3>{ticketDetailsData.description}</h3>
                            </div>
                            <div>
                                <BorderButton className="">Reply</BorderButton>
                                <BorderButton className="ml-3">Add Note</BorderButton>
                                <BorderButton className="ml-3">Forward</BorderButton>
                            </div>
                        </div>
                    </div>

                    {/* Middle Content */}
                    <div className={`border-1 w-[25%] p-2`}>
                        <h2 className="text-2xl font-bold">{ticketDetailsData.status}</h2>
                        <div className="mt-6 flex flex-col items-center p-4">
                            <h2 className="text-lg">Properties</h2>
                            <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="subject" fieldValue={ticketDetailsData["subject"]} label="Subject" updateFunction={updateTicket_api} />
                            <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="type" fieldValue={ticketDetailsData["type"]} label="Type" updateFunction={updateTicket_api} options={typeOptions} />
                            <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="status" fieldValue={ticketDetailsData["status"]} label="Status" updateFunction={updateTicket_api} options={statusOptions}/>
                            <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="priority" fieldValue={ticketDetailsData["priority"]} label="Priority" updateFunction={updateTicket_api} options={priorityOptions} />
                            <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="product" fieldValue={ticketDetailsData["product"]} label="Product" updateFunction={updateTicket_api} />
                            <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="description" fieldValue={ticketDetailsData["description"]} label="Description" updateFunction={updateTicket_api} />
                            <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="assignedTo" fieldValue={ticketDetailsData["assignedTo"]} label="Assigned To" updateFunction={updateTicket_api} options={userNames} />
                        </div>
                    </div>

                    {isExpanded && (
                        <div className="border-1 w-[25%] hover:border-2 hover:border-black p-2">
                            <>
                                <div className="flex items-center">
                                    <span className="mr-4"><AiTwotoneInfoCircle /></span>
                                    <h2>CONTACT DETAILS</h2>
                                </div>
                                <div className="flex flex-col h-[200px]">
                                    <Link className="text-blue-500 p-3">
                                        {ticketDetailsData.createdBy}  
                                    </Link>
                                    <div className="flex flex-col mb-2">
                                        <label className="font-thin">Email</label>
                                        <span className="font-bold">{ticketDetailsData.email}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-thin">Work phone</label>
                                        <span className="font-bold">{ticketDetailsData.phone}</span>
                                    </div>
                                </div>
                            </>

                        </div>
                    )
                    }


                    <MessageReply isModalOpen={isReplyModalOpen} setModalOpen={setReplyModalOpen} id={id} setTicketMsg={setTicketMsg} userNames={userNames} />
                    <AddNote isModalOpen={isNoteModalOpen} setModalOpen={setNoteModalOpen} id={id} userNames={userNames} setTicketMsg={setTicketMsg} />
                    <ForwardTicket isModalOpen={isForwardModalOpen} setModalOpen={setForwardModalOpen} id={id} userNames={userNames} setTicketMsg={setTicketMsg} ticketMsg={ticketMsg} />
                </div>
            </div>

        </>
    )
}