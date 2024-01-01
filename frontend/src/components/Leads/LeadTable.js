import React, { useCallback, useContext, useState, useEffect,useRef } from "react";
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Button, Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import deleteLead_api from "../../api_strings/admin/deleteLead_api";
import getAllLead_api from "../../api_strings/admin/getAllLead_api";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../AuthContext";
import AdminContext from "../../AdminContext";
import DynamicTable from "../DynamicTables/Table";


export default function LeadTable({ leads, setLeads, onPageChange,count,settotalCount }) {
    const [searchKey, setSearchKey] = useState("");
    const authContext = useContext(AuthContext);
    const { openConfirmationModal, closeConfirmationModal } = useContext(AdminContext);
    const skip = useRef(0);
    const limit = useRef(10);
    const navigate = useNavigate();


    const handleCreateLeadClick = () => {
        // Use the navigate function to navigate to the new URL
        navigate(`?id=new`);
    };

    const handleSearchQuery = (e) => {
        const currValue = e.target.value;
        setSearchKey(currValue);
        getAllLead_api({skip:skip.current,limit:limit.current,searchQuery:currValue},(error, res) => {
            if (error) {
              console.log("Error:", error);
            } else {
      
              setLeads(res.data.leads);
              settotalCount(res.data.totalCount);
      
            }
          });
    }

    function handleDeleteLeadClick(leadId) {
        openConfirmationModal('Are you sure you want to delete this lead?', () => {
            deleteLead_api(leadId, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {
                    setLeads((leads) => leads.filter((lead) => lead._id !== leadId));
                }
            })
          });

      
    }


    function handleDetailsLeadClick(leadId) {
        navigate(`?id=${leadId}`);
    }

    const renderCell = useCallback((lead, columnKey) => {
        switch (columnKey) {
            case "fullName": // Concatenate first name and last name
                return <span>{`${lead.firstName} ${lead.lastName}`}</span>;
            case "email":
                return <span>{lead.email}</span>;
            case "phone":
                return <span>{lead.phone[0]}</span>;
            case "leadSource":
                return <span>{lead.leadSource}</span>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        {authContext.auth.permissions["leads"]?.update && <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleDetailsLeadClick(lead._id)} />
                            </span>
                        </Tooltip>}
                        {authContext.auth.permissions["leads"]?.delete && <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteLeadClick(lead._id)} />
                            </span>
                        </Tooltip>}
                    </div>
                );
            default:
                return "";
        }
    }, []);

    const columns = [
        { name: "Name", key: "fullName" }, // Use "fullName" column for full name
        { name: "Email", key: "email" },
        { name: "Phone", key: "phone" },
        { name: "Lead Source", key: "leadSource" },
        { name: "ACTIONS", key: "actions" },
    ];



    return (
        <>
            <div className="mt-4 mb-6">
                {
                    authContext.auth.permissions["leads"].create &&
                    <div className='flex justify-between'>
                        <div>
                            <Input placeholder='Search Leads' className='w-auto' 
                            value={searchKey}
                            onChange={handleSearchQuery}
                            />
                        </div>
                        <div>

                            <Button color='primary' className='mr-4' onClick={handleCreateLeadClick}>
                                Create Leads
                            </Button>


                            <Button color='primary'>
                                Export to CSV
                            </Button>
                        </div>
                    </div>

                }
            </div>
            <DynamicTable  onPageChange={onPageChange} renderCell={renderCell} data={leads} columns={columns} count={count}/>
        </>
    );
}
