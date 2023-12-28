import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Forms from "../../Inputform/Forms";
import Backbutton from "../../Backbutton";
import CreateProjectTask_api from "../../../api_strings/admin/createProjectTask_api";
import getAllProjectTaskWithoutskip from "../../../api_strings/admin/getAllProjectTaskWithoutSkip_api";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

export default function CreateProjectTask({ onCreateSuccess,open,onCloseModal }) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { id } = useParams();
    const [tasks,setTasks] = useState([]);
    const [assignedTo,setassignedTo] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    function onSubmitForm() {
        setFormSubmitted(true);
    }

    useEffect(() => {
        getAllProjectTaskWithoutskip(id,(error,res) => {
            if(error){
                console.log(error);
            }
            else {
                setTasks(res.data.projecttasks);
                setassignedTo(res.data.participantName);
            }
        });
    },[])



    const onSubmit = (formData) => {
        const { taskName, description, startDate, endDate, priority,dependencies,assignedTo } = formData;
        CreateProjectTask_api(id, taskName, description, startDate, endDate, priority,dependencies,assignedTo,(error, res) => {
            if (error) {
                alert("Project Creation Failed");
                setFormSubmitted(false);
            }
            else {
                onCreateSuccess(res.data);

            }
        })

    }


    return (
        <>
            <div className="w-full">
                <Modal  isOpen={open} onOpenChange= {(isOpen) => {if(!isOpen) onCloseModal()}}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalBody>
                                    <Forms
                                        formSubmitted={formSubmitted}
                                        setFormSubmitted={setFormSubmitted}
                                        fields={
                                            [
                                                {
                                                    name: "taskName",
                                                    label: "Task Name",
                                                    type: "Input",
                                                    inputType: "text"
                                                },
                                                {
                                                    name: "description",
                                                    label: "Description",
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
                                                    name: "priority",
                                                    label: "Priority",
                                                    type: "Select",
                                                    options: [
                                                        { name: "Low", id: "Low" },
                                                        { name: "Medium", id: "Medium" },
                                                        { name: "High", id: "High" },
                                                    ]
                                                },
                                                {
                                                    name: "dependencies",
                                                    label: "Dependencies",
                                                    type: "Select",
                                                    options: tasks,
                                                    selectionMode: "multiple"
                                                },
                                                {
                                                    name:"assignedTo",
                                                    label:"Assigned To",
                                                    type: "Select",
                                                    options:assignedTo,
                                                    selectionMode: "multiple"
                                                }

                                            ]
                                        }
                                        selectionModeProps= "multiple"
                                        onSubmit={onSubmit}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onPress={() => onCloseModal() }>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={onSubmitForm}>
                                        Add Task
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>

                </Modal>
            </div>
        </>
    )
}