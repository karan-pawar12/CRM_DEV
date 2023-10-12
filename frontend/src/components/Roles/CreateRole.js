import Forms from "../Inputform/Forms";
import AdminContext from "../../AdminContext";
import CreateRole_api from "../../api_strings/admin/createRole_api";
import { useContext } from "react";

function CreateRole() {
    const adminContext = useContext(AdminContext);

    const onSubmit = (formData) => {
        const { name, permissions } = formData;
        console.log(name,permissions);
        CreateRole_api(name, permissions, (error, res) => {
            if (error) {
                alert("Role Creation Failed");
            }
            else {
                const currentRoleArray = adminContext.role;
                const newRoleArray = [...currentRoleArray, res.data];
                adminContext.setRole(newRoleArray);
            }
        })

    }

    return (
        <div className="w-full">
            <Forms
                fields={
                    [
                        {
                            name: "name",
                            label: "Role Name",
                            type: "Input"
                        },
                        {
                            name: "permissions",
                            label: "Permission",
                            type: "Select",
                            options: [
                                "Create",
                                "Read",
                                "Update",
                                "Delete"
                            ],
                            multiSelect :"true"
                        }
                    ]
                }
                selectionModeProps = "multiple"
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default CreateRole;