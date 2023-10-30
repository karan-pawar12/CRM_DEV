import React, { useRef, useContext, useState, useEffect } from "react";
import Forms from "../Inputform/Forms";
import createUser_api from "../../api_strings/admin/createUser_api";
import AuthContext from "../../AuthContext";
import NotAuthorized from "../NotAuthorized";
import getAllRole_api from "../../api_strings/admin/getAllRole";

export default function CreateUser({ user, setUser }) {
    const authContext = useContext(AuthContext);
    const [roleOptions, setRoleOptions] = useState([]);
    const [error, setError] = useState({
        password: '', // Password error message
        email: '', // Email error message
        phone:'',
        role: ''
    });

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

        console.log(password.length);

        if (password.length < 8) {
            setError((prevError) => ({
                ...prevError,
                password: 'Password must be at least 8 characters long'
            }))
            return;
        } else {
            setError((prevError) => ({
                ...prevError,
                password: '',
            }));
        }

        if (!isEmailValid(email)) {
            setError((prevError) => ({
                ...prevError,
                email: 'Please enter a valid email address'
            }))
            return;
        } else {
            setError((prevError) => ({
                ...prevError,
                email: '',
            }));
        }

        if (!isNumeric(phone)) {
            setError((prevError) => ({
                ...prevError,
                phone: 'Phone number must contain only numbers'
            }))
            return;
        } else {
            setError((prevError) => ({
                ...prevError,
                phone: '',
            }));
        }

        if (role === "") {
            setError((prevError) => ({
                ...prevError,
                role: 'Please select a role or first create a role'
            }));
            return;
        } else {
            setError((prevError) => ({
                ...prevError,
                role: '',
            }));
        }

        


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


    function isEmailValid(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    function isNumeric(input) {
        return /^\d+$/.test(input);
    }

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
                    error={error}
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