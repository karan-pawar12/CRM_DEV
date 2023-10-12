import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import roleDetails_api from "../../api_strings/admin/RoleDetails_api";
import { Input, Select, SelectItem } from '@nextui-org/react';
import { EditIcon } from "../../resources/icons/icons";
import { FaCheckCircle } from 'react-icons/fa'
import { BsFillFileExcelFill } from 'react-icons/bs'
import updateRole_api from "../../api_strings/admin/updateRole_api";
const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"

const rolesArr = [
    "Create",
    "Update",
    "Delete",
    "Read"
]

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
            updateRole_api(id, field, updatedValue, (error, res) => {
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

    function handleSelectChange(e) {
        const {name,value} = e.target;
        const updatedData = { ...roleDetailsData };
        updatedData[name] = value;
        setRoleDetailsData(updatedData);

        updateRole_api(id, name, value, (error, res) => {
            if (error) {
                alert("Lead updation failed");
            } else {
                alert("Lead updated successfully");
            }
        });
         
     }

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

    const selectField = (field, label, selectionModeProps, options) => {
        return (
            <Select
                label={label}
                placeholder={`Choose ${label.toLowerCase()}`}
                labelPlacement="outside"
                name={field}
                onSelectionChange={(keys) => handleSelectChange({ target: { name: field, value: Array.from(keys) } })}
                selectedKeys={roleDetailsData[field]}
                selectionMode={selectionModeProps === "multiple" ? "multiple" : "single"}
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
        <div className={`grid w-full ${size} gap-10 mt-6`}>
            {createInputField("roleOwner","Role Owner")}
            {createInputField("name","Role Name")}
            {selectField("permissions","Permissions","multiple",rolesArr)}

        </div>
    )
}

export default RoleDetails;