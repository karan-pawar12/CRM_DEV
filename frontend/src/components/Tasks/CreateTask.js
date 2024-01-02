import { useState,useContext } from "react";
import { Button } from "@nextui-org/react";
import Forms from "../Inputform/Forms";
import AuthContext from "../../AuthContext";
import NotAuthorized from "../NotAuthorized";
import CreateTask_api from "../../api_strings/admin/createTask_api.js";
import Backbutton from "../Backbutton";
import AdminContext from "../../AdminContext.js";
import Toast from '../ToastsContainers/Toast';

function CreateTask({ onCreateSuccess }) {
    const authContext = useContext(AuthContext);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const admincontext = useContext(AdminContext);

    function onSubmitForm() {
        setFormSubmitted(true);
    }

    const onSubmit = (formData) => {
        const { taskSubject,dueDate,status,priority,reminder,participant,description } = formData;
        CreateTask_api(taskSubject,dueDate,status,priority,reminder,participant,description, (error, res) => {
            if (error) {
                admincontext.setToast({
                    msg: "Unable to create task",
                    toastType: "error",
                    onClose: null
                })
                setFormSubmitted(false);

            }
            else {
                admincontext.setToast({
                    msg: "Task created successfully",
                    toastType: "success",
                    onClose: null
                })
                onCreateSuccess(res.data);
            }
        })

    }

    if (authContext.auth.permissions["tasks"].create)
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
                    <Forms
                        formSubmitted={formSubmitted}
                        setFormSubmitted={setFormSubmitted}
                        fields={
                            [
                                {
                                    name: "taskSubject",
                                    label: "Subject",
                                    type: "Input",
                                    inputType: "text"
                                },
                                {
                                    name: "dueDate",
                                    label: "Due Date",
                                    type: "Input",
                                    inputType: "date"
                                },
                                {
                                    name: "status",
                                    label: "Status",
                                    type: "Select",
                                    options: [
                                        { name: "Not Started" },
                                        { name: "Deferred" },
                                        { name: "In Progress" },
                                        { name: "Completed" },
                                        { name: "Waiting for input" }
                                    ]
                                },
                                {
                                    name: "priority",
                                    label: "Priority",
                                    type: "Select",
                                    options: [
                                        { name: "High" },
                                        { name: "Highest" },
                                        { name: "Low" },
                                        { name: "Lowest" },
                                        { name: "Normal" }

                                    ]
                                },
                                {
                                    name:"reminder",
                                    label:"Reminder",
                                    type:"Input",
                                    inputType: "text"
                                },
                                {
                                    name:"participant",
                                    label:"Participant",
                                    type:"Select"
                                },
                                {
                                    name: "description",
                                    label: "Description",
                                    type: "Input",
                                    inputType: "text"

                                }

                            ]
                        }

                        onSubmit={onSubmit}
                    />
                </div>
            </>
        )
    else {
        return (
            <NotAuthorized />
        )
    }
}

export default CreateTask;