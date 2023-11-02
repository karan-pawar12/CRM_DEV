import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userDetails_api from "../../api_strings/admin/userDetails_api";
import { Input, Select, SelectItem } from '@nextui-org/react';
import { EditIcon } from "../../resources/icons/icons";
import { FaCheckCircle } from 'react-icons/fa'
import { BsFillFileExcelFill } from 'react-icons/bs'
import updateUser_api from "../../api_strings/admin/updateUser_api";
import Backbutton from "../Backbutton";

function UserDetails({onUpdateSuccess}) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"

    const [userDetailsData, setUserDetailsData] = useState(false);
    const [editingStates, setEditingStates] = useState({});
    const [currentField, setCurrentField] = useState(""); // State to track the current field
    const [roleOptions, setRoleOptions] = useState([]);

    useEffect(() => {
        if (id) {
            userDetails_api(id, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {
                    setEditingStates({}); // Initialize editing states for each field to false
                    setUserDetailsData(res.data.userDetails);
                    setRoleOptions(res.data.roles);
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
        if (currentField === field) {
            const updatedValue = userDetailsData[field];
            updateUser_api(id, field, updatedValue, (error, res) => {
                if (error) {
                    alert("User details updation failed");
                } else {
                    onUpdateSuccess(res.data)
                    alert("User details updated successfully");
                }
            });

            setEditingStates((prevEditingStates) => ({
                ...prevEditingStates,
                [field]: false,
            }));
        }
    };

    const handleSelectChange = (field, selectedKeys) => {
        selectedKeys = selectedKeys.target.value;
        const updatedData = { ...userDetailsData };
        updatedData[field] = selectedKeys;
        setUserDetailsData(updatedData);
        
        updateUser_api(id, field, selectedKeys, (error, res) => {
            if (error) {
                alert("User updation failed");
            } else {
                onUpdateSuccess(res.data)
                alert("User updated successfully");
            }
        });
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

    const selectField = (field, label, options) => {
        if ( userDetailsData && roleOptions.length > 0) {
            const fieldValue = userDetailsData[field];
            console.log(fieldValue);
            return (
                <Select
                    label={label}
                    defaultSelectedKeys={fieldValue}
                    selectionMode="single"
                    labelPlacement="outside"
                    className="mt-6"
                    onChange={(selectedKeys) => handleSelectChange(field, selectedKeys)}
                >
                    {options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                            {option.name}
                        </SelectItem>
                    ))}
                </Select>
            );
        }
    }

        return (
            <>
            <Backbutton />
            <div className={`grid w-full ${size} gap-10 mt-6`}>
                {createInputField("firstName", "First Name")}
                {createInputField("lastName", "Last Name")}
                {createInputField("email", "Email")}
                {createInputField("phone", "Phone No")}
                {createInputField("managers", "Managers")}
                {selectField("role", "Roles", roleOptions)}
            </div>
            </>
        );
    }

export default UserDetails;
