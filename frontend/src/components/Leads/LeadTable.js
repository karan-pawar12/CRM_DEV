import React, { useCallback, useContext, useState, useEffect } from "react";
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Button, Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import deleteLead_api from "../../api_strings/admin/deleteLead_api";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../AuthContext";

const itemsPerPage = 10;

export default function LeadTable({ lead, setLead }) {
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();




    const handleCreateLeadClick = () => {
        // Use the navigate function to navigate to the new URL
        navigate(`?id=new`);
    };

    function handleDeleteLeadClick(leadId) {
        deleteLead_api(leadId, (error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {
                setLead((leads) => leads.filter((lead) => lead._id !== leadId));
            }
        })
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
                            <Input placeholder='Search users' className='w-auto' />
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
                <TableBody items={lead.filter(lead => !lead.softDelete).slice(startIndex, endIndex)}>
                    {(lead) => (

                        <TableRow key={lead._id}>

                            {(columnKey) => <TableCell>{renderCell(lead, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                className="flex justify-center"
                total={lead.length}
                pageSize={itemsPerPage}
                page={currentPage}
                onChange={(newPage) => setCurrentPage(newPage)}
            />
        </>
    );
}
