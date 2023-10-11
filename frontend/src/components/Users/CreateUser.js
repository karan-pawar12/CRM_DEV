import React, { useRef, useContext, useState } from "react";
import Forms from "../Inputform/Forms";
import createUser_api from "../../api_strings/admin/createUser_api";
import AdminContext from "../../AdminContext";

export default function CreateUser() {
    const adminContext = useContext(AdminContext);

    const onSubmit = (formData) => {
        // Access the form data and perform actions
        const {
            firstName, lastName, password, email, phone, role, managers

        } = formData;

        createUser_api( firstName, lastName, password, email, phone, role, managers, (error, res) => {

            if (error) {

                alert("User Creation Failed");
            }
            else {
                const currentUserArray = adminContext.user;

                // Create a new array with the new lead data added to it
                const newUserArray = [...currentUserArray, res.data];

                // Update adminContext with the new lead array
                adminContext.setUser(newUserArray);
            }
        })


    };

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
                            type:"Input"
                        },
                        {
                            name:"role",
                            label:"Roles",
                            type:"Input"
                        },
                        {
                            name:"managers",
                            label:"Manager",
                            type:"Input"
                        }
                        

                    ]}
                onSubmit={onSubmit}

            />

        </div>
    );
}