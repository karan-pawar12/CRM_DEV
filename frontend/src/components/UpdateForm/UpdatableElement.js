import { Input, Button } from '@nextui-org/react';
import React, { useState, useEffect } from "react";
import { EditIcon } from "../../resources/icons/icons";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillFileExcelFill } from "react-icons/bs";
import { Select, SelectItem } from '@nextui-org/react';


export default function UpdatableElement({ fieldType, id, onUpdateSuccess, fieldName, fieldValue, label, updateFunction, rules = {}, options }) {

    const [value, setValue] = useState(fieldValue || '');
    const [editingState, setEditingState] = useState(false);
    const [error, setError] = useState(null);



    useEffect(() => {
        setValue(fieldValue || '');
    }, [fieldValue]);


    function handleSaveClick(fieldName) {


        let { required = false, isEmail = false, isPhone = false, min = null, isName = false } = rules;

        let newError = null;


        if (required && value.length === 0) {
            newError = 'This field is required.';
        } else if (isEmail && !isEmailValid(value)) {
            newError = 'Invalid email format.';
        } else if (isPhone && !isNumeric(value)) {
            newError = 'Invalid phone number format.';
        } else if (min !== null && value.length < min) {
            newError = `Minimum length is ${min}.`;
        } else if (isName && !isValidName(value)) {
            newError = 'Invalid name format.';
        }

        setError(newError);

        if (newError) {
            return;
        }
        const updatedValue = value;
        updateFunction(id, fieldName, updatedValue, (error, res) => {
            if (error) {
                alert("Lead updation failed");
            } else {
                onUpdateSuccess(res.data)
                alert("Lead updated successfully");
            }
        });

        setEditingState((previousEditingState) => !previousEditingState);




    }

    const handleEditClick = () => {
        setEditingState((previousEditingState) => !previousEditingState)
    };

    const handleSelectChange = (fieldName, selectedKeys) => {
        selectedKeys = selectedKeys.target.value;
        updateFunction(id, fieldName, selectedKeys, (error, res) => {
            if (error) {
                alert("User updation failed");
            } else {
                onUpdateSuccess(res.data);
                setValue(selectedKeys);
                alert("User updated successfully");
            }
        });
    };



    return (
        <>
            {
                fieldType === "Input" ? (
                    <Input
                        id={fieldName}
                        label={label}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        startContent={
                            <span onClick={() => handleEditClick()}>
                                <EditIcon
                                    className={`cursor-pointer ${editingState ? "hidden" : "block"}`}
                                />
                            </span>
                        }
                        endContent={
                            <span className={`flex gap-2 ${editingState ? "block" : "hidden"}`}>
                                <FaCheckCircle
                                    className="cursor-pointer"
                                    onClick={() => handleSaveClick(fieldName)}
                                />
                                <BsFillFileExcelFill
                                    className="cursor-pointer"
                                    onClick={() => handleEditClick()}
                                />
                            </span>
                        }
                        disabled={!editingState}
                        labelPlacement="outside"
                        isInvalid={error}
                        errorMessage={error}
                    />
                ) : (
                    options.length > 0 && (
                        <Select
                            id={fieldName}
                            label={label}
                            selectedKeys={Array.isArray(value) ? value : [value]}
                            selectionMode="single"
                            labelPlacement="outside"
                            className="mt-6"
                            onChange={(selectedKeys) => handleSelectChange(fieldName, selectedKeys)}
                        >
                            {options.map((option) => (
                                <SelectItem key={option.id} value={option.id}>
                                    {option.name}
                                </SelectItem>
                            ))}
                        </Select>
                    )
                )
            }
        </>
    );
}

function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}

function isNumeric(input) {
    return /^\d+$/.test(input);
}

function isValidName(name) {
    return /^[A-Za-z]+$/.test(name);
}