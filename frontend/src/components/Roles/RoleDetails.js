import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import roleDetails_api from "../../api_strings/admin/RoleDetails_api";
import updateRole_api from "../../api_strings/admin/updateRole_api";
import updatePermission_api from "../../api_strings/admin/updatePermission_api";
import { Accordion, AccordionItem, Switch } from "@nextui-org/react";
import UpdatableElement from "../UpdateForm/UpdatableElement";
import Backbutton from "../Backbutton";
const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"


function RoleDetails({onUpdateSuccess}) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [roleDetailsData, setRoleDetailsData] = useState({});


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


            }
        })
    }, []);



   

    const handleSwitchChange = async (moduleName, permissionType) => {
        const updatedPermissions = { ...roleDetailsData.permissions };
        updatedPermissions[moduleName][permissionType] = !updatedPermissions[moduleName][permissionType];
        const updatedValue = updatedPermissions[moduleName][permissionType];
        await updatePermission_api(id, { fieldName: moduleName, permissionType, fieldValue: updatedValue }, (error, res) => {
            if (error) {
                alert("API request failed");
                // If the API request fails, roll back the state to the previous value
                setRoleDetailsData(roleDetailsData);
            } else {
                onUpdateSuccess(res.data)
                alert("API request successful");
            }
        });

    };


    const permissionItems = Object.keys(roleDetailsData.permissions || {}).map((moduleName) => (
        <AccordionItem key={moduleName} aria-label={moduleName} title={moduleName}>
            {

                Object.keys(roleDetailsData.permissions[moduleName]).map((permissionType) => (
                    <div key={permissionType} className="flex justify-between mt-3">
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
        <>
            <Backbutton />
            <div className={`grid w-full ${size} gap-10 mt-6`}>
                <UpdatableElement  fieldType="Input"  onUpdateSuccess={onUpdateSuccess} id={id} fieldName="roleOwner" fieldValue={roleDetailsData["roleOwner"]}  label="Role Owner" updateFunction={updateRole_api} />
                <UpdatableElement  fieldType="Input"  onUpdateSuccess={onUpdateSuccess} id={id} fieldName="name" fieldValue={roleDetailsData["name"]}  label="Role Name" updateFunction={updateRole_api} />
                <UpdatableElement  fieldType="Input"  onUpdateSuccess={onUpdateSuccess} id={id} fieldName="description" fieldValue={roleDetailsData["description"]}  label="Description" updateFunction={updateRole_api} />
            </div>
            <div className="mt-16 h-[600px]">
                {roleDetailsData && <Accordion variant="shadow">{permissionItems}</Accordion>}

            </div>
        </>
    )
}

export default RoleDetails;