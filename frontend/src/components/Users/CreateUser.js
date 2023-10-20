import React, { useRef, useContext, useState, useEffect } from "react";
import Forms from "../Inputform/Forms";
import createUser_api from "../../api_strings/admin/createUser_api";
import AuthContext from "../../AuthContext";
import NotAuthorized from "../NotAuthorized";
import getAllRole_api from "../../api_strings/admin/getAllRole";

export default function CreateUser({ user, setUser }) {
    const authContext = useContext(AuthContext);
    const [roleOptions, setRoleOptions] = useState([]);

    useEffect(() => {
        getAllRole_api((error, res) => {
            if (error) {
                console.log(error);
            } else {
                const roles = res.data.map((role) => ({
                    name: role.name, 
                    id: role._id,    
                }));
                setRoleOptions(roles);
            }
        })
    }, [])

    const onSubmit = (formData) => {

        const {
            firstName, lastName, password, email, phone, role, managers

        } = formData;

        createUser_api(firstName, lastName, password, email, phone, role, managers, (error, res) => {

            if (error) {

                alert("User Creation Failed");
            }
            else {
                const currentUserArray = user;
                const newUserArray = [...currentUserArray, res.data];
                setUser(newUserArray);
            }
        })


    };

    if (authContext.auth.permissions["users"].create)
        return (
            <div className="w-full">

                <Forms

                    fields={
                        [
                            {
                                name: "firstName",
                                label: "First Name",
                                type: "Input"
                            },
                            {
                                name: "lastName",
                                label: "Last Name",
                                type: "Input"
                            },
                            {
                                name: "email",
                                label: "Email",
                                type: "Input"
                            },
                            {
                                name: "phone",
                                label: "Phone No",
                                type: "Input"
                            },
                            {
                                name: "password",
                                label: "Password",
                                type: "Input"
                            },
                            {
                                name: "role",
                                label: "Roles",
                                type: "Select",
                                options: roleOptions
                            },
                            {
                                name: "managers",
                                label: "Manager",
                                type: "Input"
                            }


                        ]}
                    onSubmit={onSubmit}

                />

            </div>
        )
    else {
        return (
            <NotAuthorized />
        )
    }
}