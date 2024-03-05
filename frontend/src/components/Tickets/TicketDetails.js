import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import updateTicket_api from "../../api_strings/admin/updateTicket_api";
import UpdatableElement from "../UpdateForm/UpdatableElement";
import Backbutton from "../Backbutton";
import ticketDetails_api from "../../api_strings/admin/ticketDetails_api";
import AdminContext from "../../AdminContext";
import { Button } from "@nextui-org/react";
import MailSender from "./MailSender";
import { AiOutlineProfile, AiFillForward, AiOutlineCloseCircle, AiOutlineDelete, AiTwotoneInfoCircle } from "react-icons/ai";
import MessageReply from "./MessageReply";
import { CiChat1 } from "react-icons/ci";
import AddNote from "./AddNote";
import ForwardTicket from "./ForwardTicket";
import FileIcon from "../../resources/icons/FileIcon";
import SpreadSheetIcon from "../../resources/icons/SpreadSheetIcon";
import PDFIcon from "../../resources/icons/PDFIcon";
import PhotoIcon from "../../resources/icons/PhotoIcon";
import VideoIcon from "../../resources/icons/VideoIcon";
import DeleteOutlinedIcon from "../../resources/icons/DeleteOutlinedIcon";

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
    const [userNames, setUsernames] = useState([]);
    const [isReplyModalOpen, setReplyModalOpen] = useState(false);
    const [isNoteModalOpen, setNoteModalOpen] = useState(false);
    const [isForwardModalOpen, setForwardModalOpen] = useState(false);


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

    const handleReplyModal = () => {
        setReplyModalOpen(prevState => !prevState);
    }

    const handleNoteModal = () => {
        setNoteModalOpen(prevState => !prevState);
    }

    const handleForward = () => {
        setForwardModalOpen(prevState => !prevState);
    }




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
                </header>

                {/* Main Content */}
                <div className="mt-2 flex relative">
                    {/* Left Content */}
                    <div className="w-[50%] border-1 p-2">
                        <h2 className="text-2xl font-bold ml-10">{ticketDetailsData.subject}</h2>
                        <div className="flex flex-col gap-4 ml-10">
                            <div>
                                {ticketDetailsData.content?.map((data, index) => (
                                    <div key={index} className="flex items-start mt-4">
                                        <span className="mr-2 mt-1"><CiChat1 /></span>
                                        <div className={`${data?.msgType === 'note' ? 'bg-[#FEF1E1] rounded-md p-2' :
                                            data?.msgType === 'reply' ? 'rounded-md p-2' :
                                                data?.msgType === "forward" ? 'bg-[#FEF1E1] rounded-md p-2' : ''} w-full`}>
                                            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>

                                            {/* Attachments may or may not exist */}
                                            {data.attachments && data.attachments.length > 0 &&
                                                <div className="w-[100px] mt-3">
                                                    <FileCard name={data.attachments[0].originalName} size={data.attachments[0].size} />
                                                </div>
                                            }
                                        </div>

                                    </div>
                                ))}
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

                    {/* Right Content */}
                    <div className="border-1 w-[25%] p-2">
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

                    <div className="border-1 w-[25%] hover:border-2 hover:border-black p-2">
                        <div className="flex items-center">
                            <span className="mr-4"><AiTwotoneInfoCircle /></span>
                            <h2>CONTACT DETAILS</h2>
                        </div>
                        <div className="flex flex-col h-[200px]">
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


                    <MessageReply isModalOpen={isReplyModalOpen} setModalOpen={setReplyModalOpen} id={id} setTicketDetailsData={setTicketDetailsData} userNames={userNames} />
                    <AddNote isModalOpen={isNoteModalOpen} setModalOpen={setNoteModalOpen} id={id} userNames={userNames} setTicketDetailsData={setTicketDetailsData} />
                    <ForwardTicket isModalOpen={isForwardModalOpen} setModalOpen={setForwardModalOpen} id={id} userNames={userNames} setTicketDetailsData={setTicketDetailsData} ticketDetailsData={ticketDetailsData} />
                </div>
            </div>

        </>
    )
}






function FileCard({ name, size }) {



    return <div className="border border-default-200 rounded-md py-1 px-2">
        <div className="flex gap-2 items-start">
            <ExtIcon filename={name} />
            <div className="flex flex-col gap-1">
                <div className="text-sm">{name}</div>
                <div className="text-default-500 text-xs">{getSize(size)}</div>
            </div>

        </div>
    </div>
}


const units = ['bytes', 'KB', 'MB', 'GB'];

function getSize(x) {

    let l = 0, n = parseInt(x, 10) || 0;

    while (n >= 1024 && ++l) {
        n = n / 1024;
    }

    return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}


function ExtIcon({ filename }) {

    let ext = filename.substring(filename.lastIndexOf('.') + 1);

    if (['xls', 'xlsx', 'xlsb', 'XLS', 'XLSX', 'XLSB', 'csv', 'CSV'].includes(ext)) {
        return <span className="text-green-500"><SpreadSheetIcon size={16} /></span>
    } else if (['pdf', 'PDF'].includes(ext)) {
        return <span className="text-red-500"><PDFIcon size={16} /></span>
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'cif', 'JPG', 'JPEG', 'PNG', 'GIF', "CIF", 'WEBP'].includes(ext)) {
        return <PhotoIcon size={16} />
    } else if (['mp4', 'mpeg4', 'mpeg', 'avi', 'mkv', 'MP4', 'MPEG4', 'MPEG', 'AVI', 'MKV'].includes(ext)) {
        return <VideoIcon size={16} />
    } else {
        return <FileIcon size={16} />
    }


}