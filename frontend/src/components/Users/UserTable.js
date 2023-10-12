import React, { useCallback, useContext, useState, useEffect } from "react";
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Button, Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import AdminContext from "../../AdminContext";
import getAllUser_api from "../../api_strings/admin/getAllUser_api";
import deleteUser_api from "../../api_strings/admin/deleteUser_api";
import { useNavigate } from 'react-router-dom';

const itemsPerPage = 10;

export default function UserTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const adminContext = useContext(AdminContext);
    const navigate = useNavigate();


    useEffect(() => {
        getAllUser();
    }, []);

    function getAllUser() {

        getAllUser_api((error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {

                adminContext.setUser(res.data);

            }
        });
    }

    const handleCreateUserClick = () => {
        // Use the navigate function to navigate to the new URL
        navigate(`?id=new`);
    };

    function handleDeleteUserClick(userId) {
        deleteUser_api(userId, (error, res) => {
            if (error) {
                console.log("Error:", error);
            } else {

                adminContext.setUser((users) => users.filter((user) => user._id !== userId))
            }
        })
    }

    function handleDetailsUserClick(userId){
        navigate(`?id=${userId}`);
    }

    const renderCell = useCallback((user, columnKey) => {
        switch (columnKey) {
            case "fullName": // Concatenate first name and last name
                return <span>{`${user.firstName} ${user.lastName}`}</span>;
            case "email":
                return <span>{user.email}</span>;
            case "phone":
                return <span>{user.phone[0]}</span>;
            case "role":
                return <span>{user.role[0]}</span>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleDetailsUserClick(user._id)}/>
                            </span>
                </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteUserClick(user._id)} />
                            </span>
                        </Tooltip> 
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
        { name: "Role", key: "role" },
        { name: "ACTIONS", key: "actions" },
    ];



    return (
        <>
            <div className="mt-4 mb-6">
                <div className='flex justify-between'>
                    <div>
                        <Input placeholder='Search users' className='w-auto' />
                    </div>
                    <div>

                        <Button color='primary' className='mr-4' onClick={handleCreateUserClick}>
                            Create Users
                        </Button>


                        <Button color='primary'>
                            Export to CSV
                        </Button>
                    </div>
                </div>
            </div>
            <Table aria-label="Example static collection table" selectionMode="multiple">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align="start">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={adminContext.user.slice(startIndex, endIndex)}>
                    {(user) => (

                        <TableRow key={user._id}>

                            {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                className="flex justify-center"
                total={adminContext.user.length}
                pageSize={itemsPerPage}
                current={currentPage}
                onChange={(newPage) => setCurrentPage(newPage)}
            />
        </>
    );
}
