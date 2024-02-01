import { useState,useContext,useEffect } from "react";
import Forms from "../Inputform/Forms";
import AuthContext from "../../AuthContext";
import AdminContext from "../../AdminContext";
import Backbutton from "../Backbutton";
import { Button } from '@nextui-org/react';
import Toast from "../ToastsContainers/Toast";
import NotAuthorized from "../NotAuthorized";
import  getAllUserWithoutskip  from '../../api_strings/admin/getallUserWithoutskip'
import  CreateTicket_api from '../../api_strings/admin/createTicket_api'

export default function CreateTicket({ onCreateSuccess }) {
    const authContext = useContext(AuthContext);
    const admincontext = useContext(AdminContext);
    const [userNames, setUsernames] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    function onSubmitForm() {
        setFormSubmitted(true);
    }

    const onSubmit = (formData) => {
        const {
            subject,
            type,
            status,
            priority,
            product,
            description,
            assignedTo
        } = formData;

        CreateTicket_api(subject,type,status,priority,product,description,assignedTo,(error, res) => {

        if (error) {

            admincontext.setToast({
                msg: "Unable to create Ticket",
                toastType: "error",
                onClose: null
            })
            setFormSubmitted(false);
        }
        else {
            admincontext.setToast({
                msg: "Ticket created successfully",
                toastType: "success",
                onClose: null
            })
            onCreateSuccess(res.data);
        }
    })
}

useEffect(() => {
    getAllUserWithoutskip((error, res) => {
        if (res) {
            setUsernames(res.data)
        } else {
            admincontext.setToast({
                msg: "Unable to fetch users try again",
                toastType: "error",
                onClose: null
            })
        }
    })
}, [])

if (authContext.auth.permissions["tickets"].create) {
    return (
        <>
            {
                admincontext.toast.msg && <Toast {...admincontext.toast} />
            }
            <Backbutton />
            <div className="w-full">
                <div className="flex justify-end mt-5">
                    <Button color="primary" onClick={onSubmitForm}>
                        Save
                    </Button>
                </div>
            </div>

            <Forms
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
                fields={
                    [
                        {
                            name: "subject",
                            label: "Subject",
                            type: "Input",
                            rules: { required: true },
                            errorMsg: "Please enter subject name",
                            inputType: "text"
                        },
                        {
                            name: "type",
                            label: "Type",
                            type: "Select",
                            options: [
                                { name: "Quetion", id: "Quetion" },
                                { name: "Incident", id: "Incident" },
                                { name: "Problem", id: "Problem" },
                                { name: "Feature Request", id: "Feature Request" },
                                { name: "Refund", id: "Refund" },
                            ]
                        },
                        {
                            name: "status",
                            label: "Status",
                            type: "Select",
                            options: [
                                { name: "Open", id: "Open" },
                                { name: "Pending", id: "Pending" },
                                { name: "Resolved", id: "Resolved" },
                                { name: "Closed", id: "Closed" },
                                { name: "Waiting on Customer", id: "Waiting on Customer" },
                                { name: "Waiting on Third Party", id: "Waiting on Third Party" }
                            ]
                        },
                        {
                            name: "priority",
                            label: "Priority",
                            type: "Select",
                            options: [
                                { name: "Low", id: "Low" },
                                { name: "Medium", id: "Medium" },
                                { name: "High", id: "High" },
                                { name: "Urgent", id: "Urgent" },
                            ]
                        },
                        {
                            name: "product",
                            label: "Product",
                            type: "Input",
                            rules: { required: true },
                            errorMsg: "Please provide product name",
                            inputType: "text"
                        },
                        {
                            name: "description",
                            label: "Description",
                            type: "Input",
                            inputType: "text"
                        },
                        {
                            name: "assignedTo",
                            label: "Assigned To",
                            type: "Select",
                            options: userNames,
                            selectionMode: "single"
                        }
                    ]
                }
                onSubmit={onSubmit}
            />
        </>
    )
}
else {
    return (
        <NotAuthorized />
    )
}
}