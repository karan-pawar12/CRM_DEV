import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { useRef, useState } from "react";

export default function Forms(props) {
    const { fields, onSubmit, sizeProps, selectionModeProps } = props;
    const formData = useRef(getRefValues());
    const size = sizeProps ?? "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1";

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
        onSubmit(formData.current);
        formData.current = getRefValues();
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

    return (
        <>
            <div className="flex justify-end mt-5">
                <Button color="primary" onClick={handleSaveClick}>
                    Save
                </Button>
            </div>

            <div className={`grid w-full ${size} gap-10 mt-6`}>
                {fields.map((f, index) => {
                    const key = `${f.name}-${index}`; //  unique key
                    if (f.type === "Input") {
                        return (
                            <div key={key}>
                                <Input
                                    type="text"
                                    label={f.label}
                                    placeholder={`Enter ${f.label.toLowerCase()}`}
                                    labelPlacement="outside"
                                    name={f.name}
                                    onChange={onChange}
                                    defaultValue={formData.current[f.name]}
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
                                    labelPlacement="outside"
                                    name={f.name}
                                    onSelectionChange={(keys) => handleSelectChange({ target: { name: f.name, value: Array.from(keys) } })}
                                    selectedKeys={formData.current[f.name]}
                                    selectionMode={f.selectionMode}
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
