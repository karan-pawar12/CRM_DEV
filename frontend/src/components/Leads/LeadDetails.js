import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import leadDetails_api from "../../api_strings/admin/leadDetails_api";
import { Input, Select, SelectItem } from '@nextui-org/react';
import { EditIcon } from "../../resources/icons/icons";
import { FaCheckCircle } from 'react-icons/fa'
import { BsFillFileExcelFill } from 'react-icons/bs'
import updateLead_api from "../../api_strings/admin/updateLead_api";
import Backbutton from "../Backbutton";
const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"
const leadsourceArr = ["Advertisement",
    "Cold Call",
    "Employee Referral",
    "External Referral",
    "Online Store",
    "Partner",
    "Public Relations",
    "Sales Email Alias",
    "Seminar Partner",
    "Internal Seminar",
    "Trade Show",
    "Web Download",
    "Web Research",
    "Chat",
    "Twitter",
    "Facebook",
    "Google+"];

const leadstatusArr = [
    "Attempted to Contact",
    "Contact in Future",
    "Contacted",
    "Junk Lead",
    "Lost Lead",
    "Not Contacted",
    "Pre-Qualified",
    "Not Qualified"
]

const ratingArr = ["Acquired", "Active", "Market Failed", "Project Cancelled", "Shut Down"];

function LeadDetails({onUpdateSuccess}) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [leadDetailsData, setLeadDetailsData] = useState({});
    const [editingStates, setEditingStates] = useState({});
    const [currentField, setCurrentField] = useState(""); // State to track the current field

    const formatCreatedAt = (createdAtString) => {
        const createdAtDate = new Date(createdAtString);
        return createdAtDate.toLocaleString();
    };

    useEffect(() => {
        if (id) {
            leadDetails_api(id, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {
                    const leadDetailsData = res.data;
                    leadDetailsData.createdAt = formatCreatedAt(leadDetailsData.createdAt);
                    setLeadDetailsData(leadDetailsData);

                    // Initialize editing states for each field to false
                    const initialEditingStates = {};
                    Object.keys(leadDetailsData).forEach((field) => {
                        initialEditingStates[field] = false;
                    });
                    setEditingStates(initialEditingStates);
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
        // Update the leadDetailsData state with the edited value
        const updatedData = { ...leadDetailsData };
        updatedData[field] = value;
        setLeadDetailsData(updatedData);
    };

    const handleSaveClick = (field) => {
        // Check if the field is valid
        if (currentField === field) {
            const updatedValue = leadDetailsData[field];
            updateLead_api(id, field, updatedValue, (error, res) => {
                if (error) {
                    alert("Lead updation failed");
                } else {
                     onUpdateSuccess(res.data)
                    alert("Lead updated successfully");
                }
            });
            // Disable editing after saving
            setEditingStates((prevEditingStates) => ({
                ...prevEditingStates,
                [field]: false,
            }));
        }
    };

    const handleSelectChange = (field, selectedKeys) => {
        selectedKeys = selectedKeys.target.value;
        const updatedData = { ...leadDetailsData };
        updatedData[field] = selectedKeys;
        setLeadDetailsData(updatedData);


        // Automatically update the backend here
        updateLead_api(id, field, selectedKeys, (error, res) => {
            if (error) {
                alert("Lead updation failed");
            } else {
                onUpdateSuccess(res.data)
                alert("Lead updated successfully");
            }
        });
    };

    const createInputField = (field, label) => {
        return (
            <Input
                id={field}
                label={label}
                value={leadDetailsData[field]}
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
        return (
            <Select
                label={label}
                selectedKeys={[leadDetailsData[field]]}
                selectionMode="single"
                labelPlacement="outside"
                className="mt-6"
                onChange={(selectedKeys) => handleSelectChange(field, selectedKeys)}
            >
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </Select>
        );
    }
    return (
        <>
        <Backbutton />
        <div className={`grid w-full ${size} gap-10 mt-6`}>
            {createInputField("leadOwner", "Lead Owner")}
            {createInputField("firstName", "Lead First Name")}
            {createInputField("lastName", "Lead Last Name")}
            {createInputField("email", "Email")}
            {createInputField("phone", "Phone No")}
            {createInputField("createdAt", "createdAt")}
            {createInputField("description", "description")}
            {selectField("leadSource", "Lead Source", leadsourceArr)}
            {selectField("leadStatus", "Lead Status", leadstatusArr)}
            {selectField("rating","Lead Rating",ratingArr)}
        </div>
        </>
    );
}

export default LeadDetails;
