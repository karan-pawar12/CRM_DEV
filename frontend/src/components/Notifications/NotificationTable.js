import { useCallback, useContext,useState,useEffect,useRef } from "react";
import AuthContext from "../../AuthContext";
import { Button, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";


function NotificationTable({notifications,setNotifications,count,onPageChange}) {
    const authContext = useContext(AuthContext);
    const [totalPage,setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = useRef(10);
    const navigate = useNavigate();
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

    function calculateTotalPage() {
        let temp = (count / limit.current);
        let isFraction = temp % 1 !== 0;

        if (isFraction) {
            temp = parseInt(temp) + 1;
            setTotalPage(temp);

        } else {
            setTotalPage(temp);
        }


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
            <Table aria-label="Example static collection table">
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