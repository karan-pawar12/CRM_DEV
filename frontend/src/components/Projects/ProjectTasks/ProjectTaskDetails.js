import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link,Button } from "@nextui-org/react";
import UpdatableElement from "../../UpdateForm/UpdatableElement";
import updateProjectTask_api from '../../../api_strings/admin/updateProjectTask_api'
import projectTaskDetails_api from '../../../api_strings/admin/projectTaskDetails_api'
const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"

const priorityArr =  [
    { name: "Low", id: "Low" },
    { name: "Medium", id: "Medium" },
    { name: "High", id: "High" },
] 

export default function ProjectTaskDetails({ onUpdateSuccess,open,onCloseModal,projectTaskId }) {
    const [projectTaskDetailsData, setprojectTaskDetailsData] = useState({});
    const { onOpenChange } = useDisclosure();


    useEffect(() => {
        projectTaskDetails_api(projectTaskId,(error,res) => {
            if (error) {
                console.log("Error:", error);
            }else{
                setprojectTaskDetailsData(res.data);
            }
        })
    },[projectTaskId]);


    return (
        <>
            <Modal isOpen={open} onOpenChange= {(isOpen) => {if(!isOpen) onCloseModal()}}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className={`grid w-full ${size} gap-10 mt-6`}>
                                    <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={projectTaskId} fieldName="taskName" fieldValue={projectTaskDetailsData["taskName"]} label="Task Name" updateFunction={updateProjectTask_api} />
                                    <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={projectTaskId} fieldName="description" fieldValue={projectTaskDetailsData["description"]}  label="Description" updateFunction={updateProjectTask_api} />
                                    <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={projectTaskId} fieldName="startDate" fieldValue={projectTaskDetailsData["startDate"]}  label="Start Date" updateFunction={updateProjectTask_api} />
                                    <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={projectTaskId} fieldName="endDate" fieldValue={projectTaskDetailsData["endDate"]}  label="End Date" updateFunction={updateProjectTask_api} />
                                    <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={projectTaskId} fieldName="priority" fieldValue={projectTaskDetailsData["priority"]}  label="Priority" updateFunction={updateProjectTask_api} options={priorityArr}/>
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={() => onCloseModal()}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}

                </ModalContent>

            </Modal>

        </>
    )
}