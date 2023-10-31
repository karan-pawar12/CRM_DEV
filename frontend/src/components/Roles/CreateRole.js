import Forms from "../Inputform/Forms";
import CreateRole_api from "../../api_strings/admin/createRole_api";
import Backbutton from "../Backbutton";

function CreateRole({role,setRole}) {

    const onSubmit = (formData) => {
        const { name,description } = formData;
        CreateRole_api(name,description,  (error, res) => {
            if (error) {
                alert("Role Creation Failed");
            }
            else {
                const currentRoleArray = role;
                const newRoleArray = [...currentRoleArray, res.data];
                setRole(newRoleArray);
            }
        })

    }

    return (
        <>
        <Backbutton />
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
                            name:"description",
                            label: "Description",
                            type:"Input"
                        }
            
                    ]
                }
                
                onSubmit={onSubmit}
            />
        </div>
        </>
    )
}

export default CreateRole;