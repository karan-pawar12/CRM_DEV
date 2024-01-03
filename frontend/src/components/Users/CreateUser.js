import React, { useRef, useContext, useState, useEffect } from "react";
import Forms from "../Inputform/Forms";
import { Button } from "@nextui-org/react";
import createUser_api from "../../api_strings/admin/createUser_api";
import AuthContext from "../../AuthContext";
import NotAuthorized from "../NotAuthorized";
import getAllRoleWithoutskip from "../../api_strings/admin/getAllRoleWithoutskip";
import Backbutton from '../Backbutton';
import AdminContext from "../../AdminContext";
import Toast from '../ToastsContainers/Toast';

export default function CreateUser({ onCreateSuccess }) {
    const authContext = useContext(AuthContext);
    const [roleOptions, setRoleOptions] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const admincontext = useContext(AdminContext);

    function onSubmitForm() {
        setFormSubmitted(true);
    }


    useEffect(() => {
        getAllRoleWithoutskip((error, res) => {
            if (error) {
                console.log(error);
            } else {
                setRoleOptions(res.data);
            }
        })
    }, [])

    const onSubmit = (formData) => {

        const {
            firstName, lastName, password, email, phone, role, managers

        } = formData;
        


        createUser_api(firstName, lastName, password, email, phone, role, managers, (error, res) => {

            if (error) {

                admincontext.setToast({
                    msg: "Unable to create user",
                    toastType: "error",
                    onClose: null
                })
                setFormSubmitted(false);
            }
            else {
                admincontext.setToast({
                    msg: "User created successfully",
                    toastType: "success",
                    onClose: null
                })
                onCreateSuccess(res.data);
            }
        })


    };



   

    if (authContext.auth.permissions["users"].create)
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
                                name: "firstName",
                                label: "First Name",
                                type: "Input",
                                rules:{required:true},
                                errorMsg:"Please enter valid first Name",
                                inputType: "text"
                            },
                            {
                                name: "lastName",
                                label: "Last Name",
                                type: "Input",
                                rules:{required:true},
                                errorMsg:"Please enter valid last Name",
                                inputType: "text"
                            },
                            {
                                name: "email",
                                label: "Email",
                                type: "Input",
                                rules:{required:true,isEmail:true},
                                inputType: "text"
                            },
                            {
                                name: "phone",
                                label: "Phone No",
                                type: "Input",
                                rules:{required:true,isPhone:true},
                                errorMsg:"Enter numbers only",
                                inputType: "text"
                            },
                            {
                                name: "password",
                                label: "Password",
                                type: "Input",
                                rules:{min:8},
                                errorMsg:"Password length should be greater than 8 Character",
                                inputType: "password"
                            },
                            {
                                name: "role",
                                label: "Roles",
                                type: "Select",
                                options: roleOptions,
                            },
                            {
                                name: "managers",
                                label: "Manager",
                                type: "Input",
                                inputType: "text"
                            }


                        ]}
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