import React, { useCallback, useContext, useState, useEffect,useRef } from "react";
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Button, Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import deleteLead_api from "../../api_strings/admin/deleteLead_api";
import getAllLead_api from "../../api_strings/admin/getAllLead_api";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../AuthContext";
import AdminContext from "../../AdminContext";

const limit = 10;

export default function LeadTable({ leads, setLeads, onPageChange,count,settotalCount }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const authContext = useContext(AuthContext);
    const { openConfirmationModal, closeConfirmationModal } = useContext(AdminContext);
    const skip = useRef(0);
    const limit = useRef(10);
    const navigate = useNavigate();

    useEffect(()=>{
        calculateTotalPage();
    },[count])



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

    function calculateTotalPage(){
        let temp = (count/limit);
        if(temp>parseInt(temp)){
            temp = parseInt(temp) + 1;
        }else{
            temp = parseInt(temp);
            
        }
        setTotalPage(temp);
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
            <Table aria-label="Example static collection table" selectionMode="multiple">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align="start">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={leads}>
                    {(lead) => (

                        <TableRow key={lead._id}>

                            {(columnKey) => <TableCell>{renderCell(lead, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                className="flex justify-center"
                total={totalPage}
                page={currentPage}
                onChange={onPageChange}
            />
        </>
    );
}
