import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userDetails_api from "../../api_strings/admin/userDetails_api";
import updateUser_api from "../../api_strings/admin/updateUser_api";
import Backbutton from "../Backbutton";
import UpdatableElement from '../UpdateForm/UpdatableElement'

function UserDetails({ onUpdateSuccess }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"

    const [userDetailsData, setUserDetailsData] = useState(false);
    const [roleOptions, setRoleOptions] = useState([]);

    useEffect(() => {
        if (id) {
            userDetails_api(id, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {
                    setUserDetailsData(res.data.userDetails);
                    setRoleOptions(res.data.roles);
                }
            });


        }
    }, [id]);




    return (
        <>
            <Backbutton />
            <div className={`grid w-full ${size} gap-10 mt-6`}>
                <UpdatableElement fieldType="Input"  onUpdateSuccess={onUpdateSuccess} id={id} fieldName="firstName" fieldValue={userDetailsData["firstName"]} label="First Name" updateFunction={updateUser_api} 
                rules={{ required: true, isName: true }}
                />
                <UpdatableElement fieldType="Input"  onUpdateSuccess={onUpdateSuccess} id={id} fieldName="lastName" fieldValue={userDetailsData["lastName"]} label="Last Name" updateFunction={updateUser_api} 
                rules={{ required: true, isName: true }}
                />
                <UpdatableElement fieldType="Input"  onUpdateSuccess={onUpdateSuccess} id={id} fieldName="email" fieldValue={userDetailsData["email"]} label="Email" updateFunction={updateUser_api} 
                rules={{ required: true, isEmail: true }}
                />
                <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="phone" fieldValue={userDetailsData["phone"]} label="Phone" updateFunction={updateUser_api} 
                rules={{ required: true, isPhone: true }}
                />
                <UpdatableElement fieldType="Select"  id={id} onUpdateSuccess={onUpdateSuccess} fieldName="role" fieldValue={userDetailsData["role"]} label="Role" updateFunction={updateUser_api} options={roleOptions}/>
            </div>
        </>
    );
}

export default UserDetails;
