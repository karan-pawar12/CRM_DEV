import React, { useCallback, useContext } from "react";
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Select, Tooltip, SelectItem } from '@nextui-org/react';
import { Button, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../AuthContext";
import AdminContext from "../../AdminContext";
import DynamicTable from "../DynamicTables/Table";
import deleteTicket_api from "../../api_strings/admin/deleteTicket_api"
import updateTicket_api from "../../api_strings/admin/updateTicket_api";
import exportCsv_api from "../../api_strings/admin/exportCsv_api";
import FilterTicket from './FilterTicket'


export default function TicketTable({ tickets, setTickets, onPageChange, count, settotalCount, onUpdateSuccess, userNames,filter, setFilter }) {
    
    const authContext = useContext(AuthContext);
    const { openConfirmationModal, closeConfirmationModal } = useContext(AdminContext);
    const navigate = useNavigate();



    const priorityColorMap = {
        "Low": "default",
        "Medium": "primary",
        "High": "danger",
        "Urgent": "warning",
    };

    const priorityOptions = [
        { name: "Low", id: "Low" },
        { name: "Medium", id: "Medium" },
        { name: "High", id: "High" },
        { name: "Urgent", id: "Urgent" },
    ]

    const statusOptions = [
        { name: "Open", id: "Open" },
        { name: "Pending", id: "Pending" },
        { name: "Resolved", id: "Resolved" },
        { name: "Closed", id: "Closed" },
        { name: "Waiting on Customer", id: "Waiting on Customer" },
        { name: "Waiting on Third Party", id: "Waiting on Third Party" }
    ]


    function handleExport() {
        exportCsv_api((err, res) => {
            if (res) {

                const url = window.URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', "ticket.csv")
                document.body.appendChild(link)
                link.click()
                link.remove()


            }
        })
    }







    const handleCreateTicketClick = () => {
        // Use the navigate function to navigate to the new URL
        navigate(`?id=new`);
    };

    const handleSearchQuery = (e) => {
        const currValue = e.target.value;
        setFilter((old) => {
            let temp = JSON.parse(JSON.stringify(old));
            temp.searchQuery = currValue;
            return temp;
        });
    }

    function handleDeleteTicketClick(ticketId) {
        openConfirmationModal('Are you sure you want to delete this tickets ?', () => {
            deleteTicket_api(ticketId, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {

                    setTickets((tickets) => tickets.filter((ticket) => ticket._id !== ticketId))
                }
            })
        })
    }

    function handleDetailsTicketClick(ticketId) {
        navigate(`?id=${ticketId}`);
    }

    function handleUpdate(keys) {
        let fieldName = keys.fieldName;
        let id = keys.id;
        let selectedKeys = keys.value[0]
        updateTicket_api(id, fieldName, selectedKeys, (error, res) => {
            if (error) {
                alert("User updation failed");
            } else {
                onUpdateSuccess(res.data);
            }
        });
    }


    const renderCell = (ticket, columnKey) => {
        switch (columnKey) {
            case "subject":
                return <span>{`${ticket.subject}`}</span>;
            case "status":
                return (
                    <Select
                        selectedKeys={[ticket.status]}
                        placeholder="Select an status"
                        onSelectionChange={(keys) => handleUpdate({ value: Array.from(keys), fieldName: 'status', id: ticket._id })}
                    >
                        {statusOptions.map((status) => (
                            <SelectItem key={status.id} value={status.id}>
                                {status.name}
                            </SelectItem>
                        ))}
                    </Select>
                )
            case "priority":
                return (
                    <Select
                        selectedKeys={[ticket.priority]}
                        placeholder="Select an priority"
                        color={priorityColorMap[ticket.priority]}
                        onSelectionChange={(keys) => handleUpdate({ value: Array.from(keys), fieldName: 'priority', id: ticket._id })}
                    >
                        {priorityOptions.map((priority) => (
                            <SelectItem key={priority.id} value={priority.id}>
                                {priority.name}
                            </SelectItem>
                        ))}
                    </Select>
                )
            case "product":
                return <span>{ticket.product}</span>
            case "assignedTo":
                return (
                    <Select
                        items={userNames}
                        defaultSelectedKeys={[ticket.assignedTo]}
                        placeholder="Select an user"
                        onSelectionChange={(keys) => handleUpdate({ value: Array.from(keys), fieldName: 'assignedTo', id: ticket._id })}
                    >
                        {userNames.map((temp) => (
                            <SelectItem key={temp.id} value={temp.id}>
                                {temp.name}
                            </SelectItem>
                        ))}
                    </Select>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        {authContext.auth.permissions["tickets"]?.update && <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleDetailsTicketClick(ticket._id)} />
                            </span>
                        </Tooltip>}
                        {authContext.auth.permissions["tickets"]?.delete && <Tooltip color="danger" content="Delete Ticket">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteTicketClick(ticket._id)} />
                            </span>
                        </Tooltip>}
                    </div>
                );
            default:
                return "";
        }
    };

    const columns = [
        { name: "Subject", key: "subject" }, // Use "fullName" column for full name
        { name: "Status", key: "status" },
        { name: "Priority", key: "priority" },
        { name: "Product", key: "product" },
        { name: "Agent", key: "assignedTo" },
        { name: "ACTIONS", key: "actions" },
    ];



    return (
        <div className='flex'>
            <div className="mt-4 w-screen mr-10 flex flex-col border-red-500">
                {authContext.auth.permissions["tickets"]?.create &&
                    <div className='flex justify-between mb-6'>
                        <div>
                            <Input placeholder='Search Ticket' className='w-auto'
                                value={filter.searchQuery}
                                onChange={handleSearchQuery}
                            />
                        </div>
                        <div>

                            <Button color='primary' className='mr-4' onClick={handleCreateTicketClick}>
                                Create Ticket
                            </Button>


                            <Button color='primary' onClick={handleExport}>
                                Export to CSV
                            </Button>
                        </div>
                    </div>}
                <DynamicTable onPageChange={onPageChange} renderCell={renderCell} data={tickets} columns={columns} count={count} />
            </div>

             <div style={{ marginLeft: 'auto' }}>
                <FilterTicket setFilter={setFilter}/>
            </div> 
        </div>
    );
}
