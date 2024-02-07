import React from 'react';
import { Select,SelectItem } from '@nextui-org/react';

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

const typeOptions =  [
    { name: "Quetion", id: "Quetion" },
    { name: "Incident", id: "Incident" },
    { name: "Problem", id: "Problem" },
    { name: "Feature Request", id: "Feature Request" },
    { name: "Refund", id: "Refund" },
]

export default function FilterTicket({setFilter}) {
    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md w-[200px] h-screen overflow-hidden mt-4">
            <h2 className="text-lg font-semibold mb-2">Filter</h2>
            <div className="mb-4">
                <Select
                    placeholder="Select an priority"
                    label="Priority"
                    className='w-full mt-3 '
                    size="sm"
                    onSelectionChange={(keys) => {
                        setFilter((old) => {
                            let temp = JSON.parse(JSON.stringify(old));
                            temp.priority = Array.from(keys)[0];
                            return temp;
                        });
                  
                        
                     }}
                >
                    {priorityOptions.map((priority) => (
                        <SelectItem key={priority.id} value={priority.id}>
                            {priority.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="mb-4">
                <Select
                    label="Status"
                    placeholder="Select an status"
                    className='w-full mt-3 '
                    size="sm"
                    onSelectionChange={(keys) => {
                        setFilter((old) => {
                            let temp = JSON.parse(JSON.stringify(old));
                            temp.status = Array.from(keys)[0];
                            return temp;
                        });
                  
                        
                     }}
                >
                    {statusOptions.map((status) => (
                        <SelectItem key={status.id} value={status.id}>
                            {status.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="mb-4">
                <Select
                    label="Type"
                    placeholder="Select an type"
                    className='w-full mt-3'
                    size="sm"
                    onSelectionChange={(keys) => {
                        setFilter((old) => {
                            let temp = JSON.parse(JSON.stringify(old));
                            temp.type = Array.from(keys)[0];
                            return temp;
                        });
                  
                        
                     }}
                >
                    {typeOptions.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                            {type.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}
