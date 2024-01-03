import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";

export default function Forms(props) {
    const { fields, onSubmit, formSubmitted, setFormSubmitted, sizeProps } = props;
    const formData = useRef(getRefValues());
    const [formEmpty, setFormEmpty] = useState(true);
    const size = sizeProps ?? "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1";
    const [errors, setErrors] = useState(getNullErrors());

    useEffect(() => {
        if (formSubmitted) {
            handleSaveClick();
        }
    }, [formSubmitted])

    const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        handleSaveClick();
    }
  };

    function getNullErrors() {
        let temp = {};
        for (let i = 0; i < fields.length; i++) {

            temp[fields[i].name] = false;
        }
        return temp;
    }

    function getRefValues() {
        let temp = {};
        for (let i = 0; i < fields.length; i++) {
            const isMultiSelect = fields[i].selectionMode === true;
            temp[fields[i].name] = isMultiSelect ? [] : "";
        }
        return temp;
    }

    function onChange(e) {
        const { name, value } = e.target;
        let temp = formData.current
        formData.current = {
            ...temp,
            [name]: value,
        }
    }

    function handleSaveClick() {

        let hasError = false;
        let tempErrors = JSON.parse(JSON.stringify(errors));
        for (let i = 0; i < fields.length; i++) {

            if (!fields[i].hasOwnProperty('rules')) {
                fields[i].rules = {};
            }
            let { required = false, min = null, max = null, isEmail = false, isPhone = false, isName = false } = fields[i].rules;
            let value = formData.current[fields[i].name];
            console.log(required);

            let error = false;
            if (required && value.length == 0) {
                error = true;
            }
            else if (isEmail && !isEmailValid(value)) {
                error = true;
            }
            else if (isPhone && !isNumeric(value)) {
                error = true;
            }
            else if (min != null) {
                if (value.length < min) {
                    error = true
                }
            }
            else if (isName && isValidName) {
                error = true;
            }


            if (error) {
                tempErrors[fields[i].name] = fields[i].errorMsg ?? "Invalid input for " + fields[i].name;
                hasError = true;
            } else {
                tempErrors[fields[i].name] = false;
            }
        }

        if (hasError) {
            setErrors(tempErrors);
            setFormSubmitted(false);
            return;
        }


        onSubmit(formData.current);
        // formData.current = getRefValues();
        setFormEmpty(old => !old);
    }

    function handleSelectChange(e) {
        const { name, value } = e.target;
        const field = fields.find((f) => f.name === name);

        let temp = formData.current;
        if (field.selectionMode === "multiple") {
            formData.current = {
                ...temp,
                [name]: value,
            };
        } else {
            formData.current = {
                ...temp,
                [name]: value[0],
            };
        }
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

    return (
        <>
            <div className={`grid w-full ${size} gap-4 mt-6`}>
                {fields.map((f, index) => {
                    const key = `${f.name}-${index}`; //  unique key
                    if (f.type === "Input") {
                        return (
                            <div key={key}>
                                <Input
                                    type={f.inputType}
                                    label={f.label}
                                    placeholder={`Enter ${f.label.toLowerCase()}`}
                                    name={f.name}
                                    onChange={onChange}
                                    onKeyDown={handleKeyPress}
                                    defaultValue={formData.current[f.name]}
                                    isInvalid={errors[f.name]}
                                    errorMessage={errors[f.name]}
                                />
                            </div>
                        );
                    }
                    if (f.type === "Select" && f.options) {
                        return (

                            <div key={key}>
                                <Select
                                    label={f.label}
                                    placeholder={`Choose ${f.label.toLowerCase()}`}
                                    name={f.name}
                                    defaultSelectedKeys={formData.current[f.name]}
                                    onSelectionChange={(keys) => handleSelectChange({ target: { name: f.name, value: Array.from(keys) } })}
                                    selectionMode={f.selectionMode}
                                    isInvalid={errors[f.name]}
                                    errorMessage={errors[f.name]}
                                >
                                    {f.options.map((option) => (
                                        <SelectItem key={option.id} value={option.id}>
                                            {option.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        );
                    }
                })}
            </div>
        </>
    );
}
