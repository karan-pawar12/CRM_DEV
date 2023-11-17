import { useState } from "react";
import { Button } from "@nextui-org/react";
import Forms from "../Inputform/Forms";
import CreateRole_api from "../../api_strings/admin/createRole_api";
import Backbutton from "../Backbutton";

function CreateRole({ onCreateSuccess }) {
    const [formSubmitted, setFormSubmitted] = useState(false);

    function onSubmitForm() {
        setFormSubmitted(true);
    }

    const onSubmit = (formData) => {
        const { name, description } = formData;
        CreateRole_api(name, description, (error, res) => {
            if (error) {
                alert("Role Creation Failed");
                setFormSubmitted(false);
            }
            else {
                onCreateSuccess(res.data);
            }
        })

    }

    return (
        <>
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
                                name: "name",
                                label: "Role Name",
                                type: "Input"
                            },
                            {
                                name: "description",
                                label: "Description",
                                type: "Input"
                            }

                        ]
                    }

                    onSubmit={onSubmit}
                />
            </div>
        </>
    )
}

export default CreateRole;