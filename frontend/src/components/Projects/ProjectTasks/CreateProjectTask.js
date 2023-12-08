import { Button } from "@nextui-org/react";
import { useState } from "react";
import Forms from "../../Inputform/Forms";
import Backbutton from "../../Backbutton";

export default function CreateProjectTask(){
    const [formSubmitted, setFormSubmitted] = useState(false);

    function onSubmitForm() {
        setFormSubmitted(true);
    }

    const onSubmit = (formData) => {
        const {taskName,description,startDate,endDate,priority} = formData;
        

    }
    return(
        <>
            
            <Backbutton />
            <div className="w-full">
                <div className="flex justify-end mt-5">
                    <Button color="primary" onClick={onSubmitForm}>
                        Add Task
                    </Button>
                </div>
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
                                label:"Start Date",
                                type:"Input",
                                inputType:"date"
                            },
                            {
                                name: "endDate",
                                label:"End Date",
                                type:"Input",
                                inputType:"date"
                            },
                            {
                                name:"priority",
                                label:"Priority",
                                type:"Select",
                                options:[
                                    { name: "Low", id:"Low" },
                                    {name:"Medium", id:"Medium"},
                                    { name: "High",id:"High" },
                                ]
                            }

                        ]
                    }

                    onSubmit={onSubmit}
                />
            </div>
        </>
    )
}