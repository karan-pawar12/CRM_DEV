import { useState, useContext } from "react";
import { Button } from "@nextui-org/react";
import Forms from "../Inputform/Forms";
import CreateRole_api from "../../api_strings/admin/createRole_api";
import Backbutton from "../Backbutton";
import Toast from '../ToastsContainers/Toast';
import AdminContext from "../../AdminContext";

function CreateRole({ onCreateSuccess }) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const admincontext = useContext(AdminContext);

    function onSubmitForm() {
        setFormSubmitted(true);
    }

    const onSubmit = (formData) => {
        const { name, description } = formData;
        CreateRole_api(name, description, (error, res) => {
            if (error) {
                admincontext.setToast({
                    msg: "Unable to create role",
                    toastType: "error",
                    onClose: null
                })
                setFormSubmitted(false);
            }
            else {
                admincontext.setToast({
                    msg: "Role created successfully",
                    toastType: "success",
                    onClose: null
                })
                onCreateSuccess(res.data);
            }
        })

    }

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
                                name: "name",
                                label: "Role Name",
                                type: "Input",
                                inputType: "text"
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
}

export default CreateRole;