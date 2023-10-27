import { useCallback, useContext,useState } from "react";
import AuthContext from "../../AuthContext";
import { Button, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";

const itemsPerPage = 10;

function NotificationTable({notification,setNotification}) {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


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
            <Table aria-label="Example static collection table" selectionMode="multiple">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align="start">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={notification.slice(startIndex, endIndex)}>
                    {(notification) => (

                        <TableRow key={notification._id}>

                            {(columnKey) => <TableCell>{renderCell(notification, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                className="flex justify-center"
                total={notification.length}
                pageSize={itemsPerPage}
                page={currentPage}
                onChange={(newPage) => setCurrentPage(newPage)}
            />
        </>
    )
}

export default NotificationTable;