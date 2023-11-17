
import { Input, Button } from '@nextui-org/react';
import React, {useState} from "react";
import {EditIcon} from "../../resources/icons/icons";
import {FaCheckCircle} from "react-icons/fa";
import {BsFillFileExcelFill} from "react-icons/bs";
import updateLead_api from "../../api_strings/admin/updateLead_api";


export default function UpdatableInputElement({fieldName,fieldValue,label,placeholder,updateFunction,rules={}}){

    const [value,setValue] = useState(fieldValue);

    function handleSaveClick(){


        let {required=false,min=null,max=null,isEmail=false,isPhone=false,isName=false} = rules;


        let error = false;
        if(required && value.length==0){
            error = true;
        }
        else if(isEmail && !isEmailValid(value)){
            error =true;
        }
        else if(isPhone && !isNumeric(value)){
            error = true;
        }
        else if(min!=null){
            if(value.length<min){
                error = true
            }
        }
        else if(isName && !isValidName){
            error = true;
        }


       if(error){
           return false;
       }


        updateFunction(id, field, updatedValue, (error, res) => {
            if (error) {
                alert("Lead updation failed");
            } else {
                onUpdateSuccess(res.data)
                alert("Lead updated successfully");
            }
        });




    }

     return (
        <Input

            label={label}
            value={fieldValue}
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
}