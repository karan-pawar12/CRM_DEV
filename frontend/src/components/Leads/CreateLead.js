import React, { useRef, useContext, useState } from "react";
import Forms from "../Inputform/Forms";
import createLead_api from "../../api_strings/admin/createLead_api";
import AuthContext from "../../AuthContext";
import NotAuthorized from "../NotAuthorized";

export default function CreateLead({ lead, setLead }) {
  const authContext = useContext(AuthContext);


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
        alert("Lead Creation Failed");
      }
      else {
        const currentLeadArray = lead;
        const newLeadArray = [...currentLeadArray, res.data];
        setLead(newLeadArray);
      }
    })


  };

  if (authContext.auth.permissions["leads"].create)

    return (
      <div className="w-full">

        <Forms

          fields={
            [
              {
                name: "firstName",
                label: "First Name",
                type: "Input"
              },
              {
                name: "lastName",
                label: "Last Name",
                type: "Input"
              },
              {
                name: "email",
                label: "Email",
                type: "Input"
              },
              {
                name: "phone",
                label: "Phone No",
                type: "Input"
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
                options: ["Acquired", "Active", "Market Failed", "Project Canceelled", "Shut Down"]
              },
              {
                name: "leadSource",
                label: "Lead Source",
                type: "Select",
                options: [
                  "Advertisement",
                  "Cold Call",
                  "Employee Referral",
                  "External Referral",
                  "Online Store",
                  "Partner",
                  "Public Relations",
                  "Sales Email Alias",
                  "Seminar Partner",
                  "Internal Seminar",
                  "Trade Show",
                  "Web Download",
                  "Web Research",
                  "Chat",
                  "Twitter",
                  "Facebook",
                  "Google+"
                ]
              },
              {
                name: "leadStatus",
                label: "Lead Status",
                type: "Select",
                options: [
                  "Attempted to Contact",
                  "Contact in Future",
                  "Contacted",
                  "Junk Lead",
                  "Lost Lead",
                  "Not Contacted",
                  "Pre-Qualified",
                  "Not Qualified"
                ]

              },
              {
                name: "street",
                label: "Street Name",
                type: "Input"
              },
              {
                name: "state",
                label: "State Name",
                type: "Input"
              },
              {
                name: "city",
                label: "City Name",
                type: "Input"
              },
              {
                name: "country",
                label: "Country Name",
                type: "Input"
              },
              {
                name: "zipcode",
                label: "Zip Code",
                type: "Input"
              },
              {
                name: "description",
                label: "Description",
                type: "Input"
              }


            ]}
          onSubmit={onSubmit}

        />

      </div>
    )
  else {
    return (
        <NotAuthorized />
    ) 
  }
}