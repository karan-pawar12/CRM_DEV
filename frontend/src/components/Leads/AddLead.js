import React, { useRef } from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
// import {Forminput} from "../FormInput/Forminput";
import Forms from "../Inputform/Forms";

export default function AddLead() {
  // Create a ref to store form input values
  const formValues = useRef({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    rating: "",
    leadSource: "",
    leadStatus: "",
    street: "",
    state: "",
    city: "",
    country: "",
    zipcode: "",
    description: "",
  });



  // Function to handle changes in form fields
  const onChange = (e) => {
    // Update the formValues ref with the new input value
    formValues.current[e.target.name] = e.target.value;

  };

  // Function to handle form submission
  const handleSave = () => {
    // Access form data from the formValues ref
    const formData = formValues.current;
    console.log("Form Data:", formData);
    // You can perform further actions, such as sending the data to a server.
  };

  return (
    <>
    <Forms 
        fields={
          [
            {
              name:"firstName",
              label:"First Name",
              type:"Input"
            },
            {
              name:"lastName",
              label:"Last Name",
              type:"Input"
            },

          ]
        }
    />

      {/* <Forminput
        fields={[
          {
            name: "firstName",
            label: "First Name",
            type: "Input"
          }
        ]}
      /> */}




      {/* <div className="flex justify-end">
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
      <div className="flex flex-col gap-10 m-10 mt-10">

        <div>
          <span className="font-bold">Lead Information</span>
        </div> */}
      {/* <hr /> */}

      {/* <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            label="First Name"
            placeholder="Enter first name"
            labelPlacement="outside"
            name="firstName"
            onChange={onChange}
          />

          <Input
            type="text"
            label="Last Name"
            placeholder="Enter last name"
            labelPlacement="outside"
            name="lastName"
            onChange={onChange}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"
            name="email"
            onChange={onChange}
          />
          <Input
            type="phone"
            label="Phone"
            placeholder="xxxx-xxxx-xxxx"
            labelPlacement="outside"
            name="phone"
            onChange={onChange}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            label="Company Name"
            placeholder="Enter the Company's Name"
            labelPlacement="outside"
            name="companyName"
            onChange={onChange}
          />
          <Input
            type="text"
            label="Rating"
            placeholder="Select the rating"
            labelPlacement="outside"
            name="rating"
            onChange={onChange}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            label="Lead Source"
            placeholder="Select the lead source"
            labelPlacement="outside"
            name="leadSource"
            onChange={onChange}
          />
          <Input
            type="text"
            label="Lead Status"
            placeholder="Select the lead status"
            labelPlacement="outside"
            name="leadStatus"
            onChange={onChange}
          />
        </div>

        {/* <hr />

        <div>
          <span className="font-bold">Address Information</span>
        </div>

        {/* <hr /> */}

      {/* <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            label="Street"
            placeholder="Enter the street name"
            labelPlacement="outside"
            name="street"
            onChange={onChange}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            label="State"
            placeholder="Enter the state name"
            labelPlacement="outside"
            name="state"
            onChange={onChange}
          />
          <Input
            type="text"
            label="City"
            placeholder="Enter the city name"
            labelPlacement="outside"
            name="city"
            onChange={onChange}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            label="Country"
            placeholder="Enter the country name"
            labelPlacement="outside"
            name="country"
            onChange={onChange}
          />
          <Input
            type="text"
            label="Zipcode"
            placeholder="Enter the zipcode"
            labelPlacement="outside"
            name="zipcode"
            onChange={onChange}
          />
        </div>

        <hr />

        <div>
          <span className="font-bold">Description</span>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            type="text"
            label="Description"
            placeholder="Enter the Description Here"
            labelPlacement="outside"
            name="description"
            onChange={onChange}
          />
        </div> 
      </div>  */}
    </>
  );
}