import { useState, useContext, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Forms from "../Inputform/Forms";
import AuthContext from "../../AuthContext";
import NotAuthorized from "../NotAuthorized";
import CreateProject_api from "../../api_strings/admin/createProject_api.js";
import getAllUserWithoutskip from "../../api_strings/admin/getallUserWithoutskip.js";
import Backbutton from "../Backbutton";
import AdminContext from "../../AdminContext.js";
import Toast from '../ToastsContainers/Toast'

function CreateTask({ onCreateSuccess }) {
    const authContext = useContext(AuthContext);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [userOptions, setUserOptions] = useState([]);
    const admincontext = useContext(AdminContext);

    function onSubmitForm() {
        setFormSubmitted(true);
    }

    useEffect(() => {
        getAllUserWithoutskip((error, res) => {
            if (error) {
                console.log(error);
            } else {
                setUserOptions(res.data);
            }
        })
    }, [])

    const onSubmit = (formData) => {
        const { projectName, participants, createdBy, startDate, endDate, reminder, description, isPrivate, priority } = formData;
        CreateProject_api(projectName, participants, createdBy, startDate, endDate, reminder, description, isPrivate, priority, (error, res) => {
            if (error) {
                admincontext.setToast({
                    msg: "Unable to create project",
                    toastType: "error",
                    onClose: null
                })
                setFormSubmitted(false);
            }
            else {
                admincontext.setToast({
                    msg: "Project created successfully",
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
                                    name: "projectName",
                                    label: "Project Title",
                                    type: "Input",
                                    inputType: "text"
                                },
                                {
                                    name: "startDate",
                                    label: "Start Date",
                                    type: "Input",
                                    inputType: "date"
                                },
                                {
                                    name: "endDate",
                                    label: "End Date",
                                    type: "Input",
                                    inputType: "date"
                                },
                                {
                                    name: "description",
                                    label: "Description",
                                    type: "Input",
                                    inputType: "text"
                                },
                                {
                                    name: "isPrivate",
                                    label: "Make Project Private",
                                    type: "Select",
                                    options: [
                                        { name: "Yes", id: "Yes" },
                                        { name: "No", id: "No" },
                                    ]

                                },
                                {
                                    name: "participants",
                                    label: "Participants",
                                    type: "Select",
                                    options: userOptions,
                                    rules: { required: true },
                                    errorMsg: 'Please select a user or first create a user',
                                    selectionMode: "multiple"
                                },
                                {
                                    name: "priority",
                                    label: "Priority",
                                    type: "Select",
                                    options: [
                                        { name: "High", id: "High" },
                                        { name: "Highest", id: "Highest" },
                                        { name: "Low", id: "Low" },
                                        { name: "Lowest", id: "Lowest" },
                                        { name: "Normal", id: "Normal" }

                                    ]
                                }


                            ]
                        }

                        selectionModeProps="multiple"
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