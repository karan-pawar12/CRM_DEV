import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userDetails_api from "../../api_strings/admin/userDetails_api";
import { Input } from '@nextui-org/react';
import { EditIcon } from "../../resources/icons/icons";
import { FaCheckCircle } from 'react-icons/fa'
import { BsFillFileExcelFill } from 'react-icons/bs'
import updateUser_api from "../../api_strings/admin/updateUser_api";

function UserDetails() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"

    const [userDetailsData, setUserDetailsData] = useState({});
    const [editingStates, setEditingStates] = useState({});
    const [currentField, setCurrentField] = useState(""); // State to track the current field

    useEffect(() => {
        if (id) {
            userDetails_api(id, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {
                    const userDetailsData = res.data;
                    setEditingStates({}); // Initialize editing states for each field to false
                    setUserDetailsData(userDetailsData);
                }
            });
        }
    }, [id]);

    const handleEditClick = (field) => {
        setEditingStates((prevEditingStates) => ({
            ...prevEditingStates,
            [field]: !prevEditingStates[field],
        }));
        setCurrentField(field); // Set the current field when editing starts
    };

    const handleInputChange = (field, value) => {
        // Update the userDetailsData state with the edited value
        const updatedData = { ...userDetailsData };
        updatedData[field] = value;
        setUserDetailsData(updatedData);
    };

    const handleSaveClick = (field) => {
        // Check if the field is valid
        if (currentField === field) {
            const updatedValue = userDetailsData[field];
            updateUser_api(id, field, updatedValue, (error, res) => {
                if (error) {
                    alert("User details updation failed");
                } else {
                    alert("User details updated successfully");
                }
            });
            // Disable editing after saving
            setEditingStates((prevEditingStates) => ({
                ...prevEditingStates,
                [field]: false,
            }));
        }
    };

    const createInputField = (field, label) => {
        return (
            <Input
                id={field}
                label={label}
                value={userDetailsData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                startContent={
                    <span onClick={() => handleEditClick(field)}>
                        <EditIcon
                            className={`cursor-pointer ${editingStates[field] ? "hidden" : "block"}`}
                        />
                    </span>
                }
                endContent={
                    <span className={`flex gap-2 ${editingStates[field] ? "block" : "hidden"}`}>
                        <FaCheckCircle
                            className="cursor-pointer"
                            onClick={() => handleSaveClick(field)}
                        />
                        <BsFillFileExcelFill
                            className="cursor-pointer"
                            onClick={() => handleEditClick(field)}
                        />
                    </span>
                }
                disabled={!editingStates[field]}
                labelPlacement="outside"
            />
        );
    };

    return (
        <div className={`grid w-full ${size} gap-10 mt-6`}>
            {createInputField("firstName", "First Name")}
            {createInputField("lastName", "Last Name")}
            {createInputField("email", "Email")}
            {createInputField("phone", "Phone No")}
            {createInputField("role", "Role")}
            {createInputField("managers", "Managers")}
        </div>
    );
}

export default UserDetails;
