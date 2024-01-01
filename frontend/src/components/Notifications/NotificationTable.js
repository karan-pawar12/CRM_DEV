import { useCallback, useContext,useState,useEffect,useRef } from "react";
import AuthContext from "../../AuthContext";
import { Button, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import DynamicTable from "../DynamicTables/Table";


function NotificationTable({notifications,setNotifications,count,onPageChange}) {
    const authContext = useContext(AuthContext);
     const limit = useRef(10);
    const navigate = useNavigate();
 

    const handleCreateNotification = () => {
        navigate(`?id=new`);
    }

    const renderCell = useCallback((notification,columnKey) => {
        switch (columnKey) {
            case "title":
                return <span>{notification.title}</span>
            case "content":
                return <span>{notification.content}</span>
        }
    })


    const columns = [
        {name:"Title",key:"title"},
        {name:"Content",key:"content"}
    ]

    return (
        <>
            <div className="mt-4 mb-6">
                {
                    authContext.auth.permissions["notification"].create &&
                    <div className='flex justify-between'>
                        <div>
                            <Input placeholder='Search users' className='w-auto' />
                        </div>
                        <div>

                            <Button color='primary' className='mr-4' onClick={handleCreateNotification}>
                                Create Notifications
                            </Button>

                        </div>
                    </div>

                }
            </div>
            <DynamicTable onPageChange={onPageChange} renderCell={renderCell} data={notifications} columns={columns} count={count}/>
        </>
    )
}

export default NotificationTable;