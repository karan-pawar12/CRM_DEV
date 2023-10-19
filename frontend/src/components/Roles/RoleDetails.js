import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import roleDetails_api from "../../api_strings/admin/RoleDetails_api";
import { Input, Select, SelectItem } from '@nextui-org/react';
import { EditIcon } from "../../resources/icons/icons";
import { FaCheckCircle } from 'react-icons/fa'
import { BsFillFileExcelFill } from 'react-icons/bs'
import updateRole_api from "../../api_strings/admin/updateRole_api";
import { Accordion, AccordionItem, Switch } from "@nextui-org/react";
const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"


function RoleDetails() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [roleDetailsData, setRoleDetailsData] = useState({});
    const [editingStates, setEditingStates] = useState({});
    const [currentField, setCurrentField] = useState("");



    console.log(roleDetailsData);

    const formatCreatedAt = (createdAtString) => {
        const createdAtDate = new Date(createdAtString);
        return createdAtDate.toLocaleString();
    };

    useEffect(() => {
        roleDetails_api(id, (error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {
                const roleDetailsData = res.data;
                roleDetailsData.createdAt = formatCreatedAt(roleDetailsData.createdAt);
                setRoleDetailsData(roleDetailsData);

                const initialEditingStates = {};
                Object.keys(roleDetailsData).forEach((field) => {
                    initialEditingStates[field] = false;
                });
                setEditingStates(initialEditingStates);


            }
        })
    }, []);

    const handleEditClick = (field) => {
        setEditingStates((prevEditingStates) => ({
            ...prevEditingStates,
            [field]: !prevEditingStates[field],
        }));
        setCurrentField(field); // Set the current field when editing starts
    };

    const handleInputChange = (field, value) => {
        // Update the roleDetailsData state with the edited value
        const updatedData = { ...roleDetailsData };
        updatedData[field] = value;
        setRoleDetailsData(updatedData);
    };

    const handleSaveClick = (field) => {
        // Check if the field is valid
        if (currentField === field) {
            const updatedValue = roleDetailsData[field];
            updateRole_api(id, { fieldName: field, fieldValue: updatedValue }, (error, res) => {
                if (error) {
                    alert("Lead updation failed");
                } else {
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

    const handleSwitchChange = async (moduleName, permissionType) => {
        const updatedPermissions = { ...roleDetailsData.permissions };
        updatedPermissions[moduleName][permissionType] = !updatedPermissions[moduleName][permissionType];

        // Now, update the state with the updated permissions
        setRoleDetailsData((prevDetailsData) => ({
            ...prevDetailsData,
            permissions: updatedPermissions,
        }));

        const updatedValue = updatedPermissions[moduleName][permissionType];
        await updateRole_api(id, { fieldName: moduleName, permissionType, value: updatedValue }, (error, res) => {
            if (error) {
                alert("API request failed");
                // If the API request fails, roll back the state to the previous value
                setRoleDetailsData(roleDetailsData);
            } else {
                alert("API request successful");
            }
        });

    };

    const createInputField = (field, label) => {
        return (
            <Input
                id={field}
                label={label}
                value={roleDetailsData[field]}
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



    const permissionItems = Object.keys(roleDetailsData.permissions || {}).map((moduleName) => (
        <AccordionItem key={moduleName} aria-label={moduleName} title={moduleName}>
            {
                
                Object.keys(roleDetailsData.permissions[moduleName]).map((permissionType) => (
                    <div key={permissionType} className="flex justify-between mt-4">
                        {permissionType}
                        <Switch
                            defaultSelected={roleDetailsData.permissions[moduleName][permissionType]}
                            aria-label={permissionType}
                            onChange={() => handleSwitchChange(moduleName, permissionType)}
                        />
                    </div>
                ))}
        </AccordionItem>
    ));


    return (
        <div className={`grid w-full ${size} gap-10 mt-6`}>
            {createInputField("roleOwner", "Role Owner")}
            {createInputField("name", "Role Name")}
            {createInputField("description", "Description")}
            {roleDetailsData && <Accordion variant="shadow">{permissionItems}</Accordion>}

        </div>
    )
}

export default RoleDetails;