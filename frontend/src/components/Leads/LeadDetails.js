import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import leadDetails_api from "../../api_strings/admin/leadDetails_api";
import updateLead_api from "../../api_strings/admin/updateLead_api";
import UpdatableElement from "../UpdateForm/UpdatableElement";
import Backbutton from "../Backbutton";
const size = "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1"


const leadsourceArr = [
    { id: "Advertisement", name: "Advertisement" },
    { id: "Cold Call", name: "Cold Call" },
    { id: "Employee Referral", name: "Employee Referral" },
    { id: "External Referral", name: "External Referral" },
    { id: "Online Store", name: "Online Store" },
    { id: "Partner", name: "Partner" },
    { id: "Public Relations", name: "Public Relations" },
    { id: "Sales Email Alias", name: "Sales Email Alias" },
    { id: "Seminar Partner", name: "Seminar Partner" },
    { id: "Internal Seminar", name: "Internal Seminar" },
    { id: "Trade Show", name: "Trade Show" },
    { id: "Web Download", name: "Web Download" },
    { id: "Web Research", name: "Web Research" },
    { id: "Chat", name: "Chat" },
    { id: "Twitter", name: "Twitter" },
    { id: "Facebook", name: "Facebook" },
    { id: "Google+", name: "Google+" }
  ];
  
  const leadstatusArr = [
    { id: "Attempted to Contact", name: "Attempted to Contact" },
    { id: "Contact in Future", name: "Contact in Future" },
    { id: "Contacted", name: "Contacted" },
    { id: "Junk Lead", name: "Junk Lead" },
    { id: "Lost Lead", name: "Lost Lead" },
    { id: "Not Contacted", name: "Not Contacted" },
    { id: "Pre-Qualified", name: "Pre-Qualified" },
    { id: "Not Qualified", name: "Not Qualified" }
  ];
  
  const ratingArr = [
    { id: "Acquired", name: "Acquired" },
    { id: "Active", name: "Active" },
    { id: "Market Failed", name: "Market Failed" },
    { id: "Project Cancelled", name: "Project Cancelled" },
    { id: "Shut Down", name: "Shut Down" }
  ];


function LeadDetails({onUpdateSuccess}) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const [leadDetailsData, setLeadDetailsData] = useState([]);


    const formatCreatedAt = (createdAtString) => {
        const createdAtDate = new Date(createdAtString);
        return createdAtDate.toLocaleString();
    };

    useEffect(() => {
        if (id) {
            leadDetails_api(id, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {
                    const leadDetailsData = res.data;
                    leadDetailsData.createdAt = formatCreatedAt(leadDetailsData.createdAt);
                    setLeadDetailsData(leadDetailsData);

                }
            });
        }
    }, [id]);

    return (
        <>
        <Backbutton />
        <div className={`grid w-full ${size} gap-10 mt-6`}>
             <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="leadOwner" fieldValue={leadDetailsData["leadOwner"]}  label="Lead Owner" updateFunction={updateLead_api} />
             <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="firstName" fieldValue={leadDetailsData["firstName"]}  label="Lead First Name" updateFunction={updateLead_api} />
             <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="lastName" fieldValue={leadDetailsData["lastName"]}  label="Lead Last Name" updateFunction={updateLead_api} />
             <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="email" fieldValue={leadDetailsData["email"]}  label="Email" updateFunction={updateLead_api} />
             <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="phone" fieldValue={leadDetailsData["phone"]}  label="Phone no" updateFunction={updateLead_api} />
             <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="createdAt" fieldValue={leadDetailsData["createdAt"]}  label="Created At" updateFunction={updateLead_api} />
             <UpdatableElement fieldType="Input" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="description" fieldValue={leadDetailsData["description"]}  label="Description" updateFunction={updateLead_api} />
             <UpdatableElement fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="leadSource" fieldValue={leadDetailsData["leadSource"]}  label="Lead Source" updateFunction={updateLead_api} options={leadsourceArr}/>
             <UpdatableElement  fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="leadStatus" fieldValue={leadDetailsData["leadStatus"]}  label="Lead Status" updateFunction={updateLead_api} options={leadstatusArr}/>
             <UpdatableElement  fieldType="Select" onUpdateSuccess={onUpdateSuccess} id={id} fieldName="rating" fieldValue={leadDetailsData["rating"]}  label="Rating" updateFunction={updateLead_api} options={ratingArr}/>
        </div>
        </>
    );
}

export default LeadDetails;
