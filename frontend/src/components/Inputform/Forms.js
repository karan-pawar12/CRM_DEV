import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { useRef, useState } from "react";
export default function Forms(props) {
    const { fields, onSubmit, sizeProps } = props;

    const formValues = useRef(getRefValues());
    const [inputValues, setInputValues] = useState(getRefValues());
    const size = sizeProps ?? "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"
    

    function getRefValues() {
        let temp = {};
        for (let i = 0; i < fields.length; i++) {
            temp[fields[i].name] = "";
        }
        return temp;
    }

    function onChange(e) {
        const { name, value } = e.target;
        formValues.current[name] = value;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [name]: value,
        }));

    }

    function handleSaveClick() {

        onSubmit(formValues.current);
        formValues.current = getRefValues();
        setInputValues(getRefValues());
    }

    return (
        <>
            <div className="flex justify-end mt-5">
                <Button color="primary" onClick={handleSaveClick}>
                    Save
                </Button>
            </div>

            <div className={`grid w-full ${size} gap-10 mt-6`}>


                {fields.map(f => {

                    if (f.type === "Input") {

                        return (
                            <div>
                                <Input
                                    type="text"
                                    label={f.label}
                                    placeholder={`Enter ${f.label.toLowerCase()}`}
                                    labelPlacement="outside"
                                    name={f.name}
                                    onChange={onChange}
                                    value={inputValues[f.name]}
                                />
                            </div>


                        )

                    }

                    if (f.type === "Select" && f.options) {
                        return (
                            <div>
                                <Select
                                    label={f.label}
                                    placeholder={`Choose ${f.label.toLowerCase()}`}
                                    labelPlacement="outside"
                                    name={f.name}
                                    onChange={onChange}
                                    value={inputValues[f.name]}
                                >
                                    {f.options.map(option => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                        )
                    }



                })}


            </div>
        </>
    )
}