import React, { useRef, useContext, useState } from "react";
import Forms from "../Inputform/Forms";
import createLead_api from "../../api_strings/admin/createLead_api";
import AuthContext from "../../AuthContext";
import NotAuthorized from "../NotAuthorized";
import Backbutton from "../Backbutton";
import { Button } from "@nextui-org/react";
import AdminContext from "../../AdminContext";
import Toast from '../ToastsContainers/Toast'

export default function CreateLead({ onCreateSuccess }) {
  const authContext = useContext(AuthContext);
  const admincontext = useContext(AdminContext);
  const [formSubmitted, setFormSubmitted] = useState(false);

  function onSubmitForm() {
    setFormSubmitted(true);
  }


  const onSubmit = (formData) => {
    // Access the form data and perform actions
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      rating,
      leadSource,
      leadStatus,
      street,
      state,
      city,
      country,
      zipcode,
      description
    } = formData;

    createLead_api(firstName, lastName, email, phone, company, rating, leadSource, leadStatus, street, state, city, country, zipcode, description, (error, res) => {

      if (error) {
        admincontext.setToast({
          msg: "Unable to create lead",
          toastType: "error",
          onClose: null
        })
        setFormSubmitted(false);
      }
      else {
        admincontext.setToast({
          msg: "Lead created successfully",
          toastType: "success",
          onClose: null
        })
        onCreateSuccess(res.data);
      }
    })


  };

  if (authContext.auth.permissions["leads"].create)

    return (
      <>
        {
          admincontext.toast.msg && <Toast {...admincontext.toast} />
        }
        <Backbutton />
        <div className="w-full">
          <div className="flex justify-end mt-5">
            <Button color="primary" onClick={onSubmitForm}>
              Save
            </Button>
          </div>

          <Forms
            formSubmitted={formSubmitted}
            setFormSubmitted={setFormSubmitted}
            fields={
              [
                {
                  name: "firstName",
                  label: "First Name",
                  type: "Input",
                  rules: { required: true },
                  errorMsg: "Please enter valid first Name",
                  inputType: "text"
                },
                {
                  name: "lastName",
                  label: "Last Name",
                  type: "Input",
                  rules: { required: true },
                  errorMsg: "Please enter valid last Name",
                  inputType: "text"
                },
                {
                  name: "email",
                  label: "Email",
                  type: "Input",
                  rules: { required: true, isEmail: true },
                  inputType: "text"
                },
                {
                  name: "phone",
                  label: "Phone No",
                  type: "Input",
                  rules: { required: true, isPhone: true },
                  errorMsg: "Enter numbers only",
                  inputType: "tel"
                },
                {
                  name: "company",
                  label: "Company Name",
                  type: "Select",
                  options: []
                },
                {
                  name: "rating",
                  label: "Rating",
                  type: "Select",
                  options: [
                    { name: "Acquired", id: "Acquired" },
                    { name: "Active", id: "Active" },
                    { name: "Market Failed", id: "Market Failed" },
                    { name: "Project Cancelled", id: "Project Cancelled" },
                    { name: "Shut Down", id: "Shut Down" },
                  ]
                },
                {
                  name: "leadSource",
                  label: "Lead Source",
                  type: "Select",
                  options: [
                    { name: "Advertisement", id: "Advertisement" },
                    { name: "Cold Call", id: "Cold Call" },
                    { name: "Employee Referral", id: "Employee Referral" },
                    { name: "External Referral", id: "External Referral" },
                    { name: "Online Store", id: "Online Store" },
                    { name: "Partner", id: "Partner" },
                    { name: "Public Relations", id: "Public Relations" },
                    { name: "Sales Email Alias", id: "Sales Email Alias" },
                    { name: "Seminar Partner", id: "Seminar Partner" },
                    { name: "Internal Seminar", id: "Internal Seminar" },
                    { name: "Trade Show", id: "Trade Show" },
                    { name: "Web Download", id: "Web Download" },
                    { name: "Web Research", id: "Web Research" },
                    { name: "Chat", id: "Chat" },
                    { name: "Twitter", id: "Twitter" },
                    { name: "Facebook", id: "Facebook" },
                    { name: "Google+", id: "Google+" },
                  ]
                },
                {
                  name: "leadStatus",
                  label: "Lead Status",
                  type: "Select",
                  options: [
                    { name: "Attempted to Contact", id: "Attempted to Contact" },
                    { name: "Contact in Future", id: "Contact in Future" },
                    { name: "Contacted", id: "Contacted" },
                    { name: "Junk Lead", id: "Junk Lead" },
                    { name: "Lost Lead", id: "Lost Lead" },
                    { name: "Not Contacted", id: "Not Contacted" },
                    { name: "Pre-Qualified", id: "Pre-Qualified" },
                    { name: "Not Qualified", id: "Not Qualified" },
                  ]

                },
                {
                  name: "street",
                  label: "Street Name",
                  type: "Input",
                  inputType: "text"
                },
                {
                  name: "state",
                  label: "State Name",
                  type: "Input",
                  inputType: "text"
                },
                {
                  name: "city",
                  label: "City Name",
                  type: "Input",
                  inputType: "text"
                },
                {
                  name: "country",
                  label: "Country Name",
                  type: "Input",
                  inputType: "text"
                },
                {
                  name: "zipcode",
                  label: "Zip Code",
                  type: "Input",
                  inputType: "text"
                },
                {
                  name: "description",
                  label: "Description",
                  type: "Input",
                  inputType: "text"
                }


              ]}

            onSubmit={onSubmit}


          />

        </div>
      </>
    )
  else {
    return (
      <NotAuthorized />
    )
  }
}