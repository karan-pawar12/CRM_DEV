import { useCallback, useContext,useState,useEffect } from "react";
import AuthContext from "../../AuthContext";
import { Button, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";

const limit = 10;

function NotificationTable({notifications,setNotifications,count,onPageChange}) {
    const authContext = useContext(AuthContext);
    const [totalPage,setTotalPage] = useState(1);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(()=>{
        calculateTotalPage();
    },[count])

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

    function calculateTotalPage(){
        let temp = (count/limit);
        if(temp>parseInt(temp)){
            temp = parseInt(temp) + 1;
        }else{
            temp = parseInt(temp);
            
        }
        setTotalPage(temp);
    }

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
            <Table aria-label="Example static collection table" selectionMode="multiple">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align="start">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={notifications}>
                    {(notification) => (

                        <TableRow key={notification._id}>

                            {(columnKey) => <TableCell>{renderCell(notification, columnKey)}</TableCell>}
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
    )
}

export default NotificationTable;