import { Input,Select } from "@nextui-org/react";
import { useRef } from "react";
export default function Forms(props) {
    const { fields } = props;
    const commonClassName = "flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4";
    const formValues = useRef(getRefValues());

    function getRefValues() {
        let temp = {};
        for (let i = 0; i < fields.length; i++) {
            temp[fields[i].name] = null;
        }
        return temp;
    }

    function onChange(e) {
        formValues.current[e.target.name] = e.target.value;
    }
    function returnFormValues() {
        return formValues.current;
    }

    return (
        <div className="flex flex-col gap-10 m-10 mt-10">
            {fields.map(f => {
            
                if (f.type === "Select") {

                    return <Select

                        onChange={onChange}

                        label={f.label}

                        name={f.name}

                        className={commonClassName}

                    />

                }



                if (f.type === "Input") {

                    return <Input

                        onChange={onChange}

                        label={f.label}

                        name={f.name}

                        className= "flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"

                        
                    />

                }

            })}
           

        </div>
    )
}