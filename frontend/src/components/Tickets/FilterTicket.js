import React, { useState } from 'react';
import { Select, SelectItem, Input, Chip } from '@nextui-org/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import Filter from '../DynamicFilter.js/Filter';

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

const typeOptions = [
    { name: "Quetion", id: "Quetion" },
    { name: "Incident", id: "Incident" },
    { name: "Problem", id: "Problem" },
    { name: "Feature Request", id: "Feature Request" },
    { name: "Refund", id: "Refund" },
]


export default function FilterTicket({ setFilter }) {

    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md w-[300px] h-screen mt-4">
            <h2 className="text-lg font-semibold mb-2">Filter</h2>
            <Filter
                fields={
                    [
                        {
                            type: "Select",
                            fieldName: "priority",
                            label: "Priority",
                            placeholder: "Select an priority",
                            size: "sm",
                            setFilter: setFilter,
                            options: priorityOptions
                        },
                        {
                            type: "Select",
                            fieldName: "status",
                            label: "Status",
                            placeholder: "Select an Status",
                            size: "sm",
                            setFilter: setFilter,
                            options: statusOptions
                        },
                        {
                            type: "Select",
                            fieldName: "type",
                            label: "Type",
                            placeholder: "Select an Type",
                            size: "sm",
                            setFilter: setFilter,
                            options: typeOptions
                        },
                        {
                            type:"timeline",
                            setFilter:setFilter
                        }
                    ]
                }
            />
        </div>
    );
}
