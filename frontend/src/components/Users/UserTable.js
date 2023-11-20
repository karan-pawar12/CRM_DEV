import React, { useCallback, useContext, useState, useEffect,useRef } from "react";
import { EditIcon, DeleteIcon, EyeIcon } from "../../resources/icons/icons";
import { Button, Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, Pagination } from "@nextui-org/react";
import deleteUser_api from "../../api_strings/admin/deleteUser_api";
import getAllUser_api from '../../api_strings/admin/getAllUser_api'
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../AuthContext";
import AdminContext from "../../AdminContext";

const limit = 10;

export default function UserTable({ users, setUsers,onPageChange, count, settotalCount }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const [totalPage,setTotalPage] = useState(1);
    const authContext = useContext(AuthContext);
    const skip = useRef(0);
    const limit = useRef(10);
    const { openConfirmationModal, closeConfirmationModal } = useContext(AdminContext);
    const navigate = useNavigate();


    useEffect(()=>{
        calculateTotalPage();
    },[count])





    const handleCreateUserClick = () => {
        // Use the navigate function to navigate to the new URL
        navigate(`?id=new`);
    };

    const handleSearchQuery = (e) => {
        const currValue = e.target.value;
        setSearchKey(currValue);
        getAllUser_api({skip:skip.current,limit:limit.current,searchQuery:currValue},(error, res) => {
            if (error) {
              console.log("Error:", error);
            } else {
      
              setUsers(res.data.users);
              settotalCount(res.data.totalCount);
      
            }
          });
    }

    function handleDeleteUserClick(userId) {
        openConfirmationModal('Are you sure you want to delete this user ?', () => {
            deleteUser_api(userId, (error, res) => {
                if (error) {
                    console.log("Error:", error);
                } else {

                    setUsers((users) => users.filter((user) => user._id !== userId))
                }
            })
        })
    }

    function handleDetailsUserClick(userId) {
        navigate(`?id=${userId}`);
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

    const renderCell = useCallback((user, columnKey) => {
        switch (columnKey) {
            case "fullName": // Concatenate first name and last name
                return <span>{`${user.firstName} ${user.lastName}`}</span>;
            case "email":
                return <span>{user.email}</span>;
            case "phone":
                return <span>{user.phone[0]}</span>;
            case "role":
                return <span>{user.role}</span>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-3">
                        {authContext.auth.permissions["users"]?.delete && <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => handleDetailsUserClick(user._id)} />
                            </span>
                        </Tooltip>}
                        {authContext.auth.permissions["users"]?.update && <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon onClick={() => handleDeleteUserClick(user._id)} />
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
        { name: "Role", key: "role" },
        { name: "ACTIONS", key: "actions" },
    ];



    return (
        <>
            <div className="mt-4 mb-6">
                {authContext.auth.permissions["users"]?.create && <div className='flex justify-between'>
                    <div>
                        <Input placeholder='Search users' className='w-auto' 
                        value={searchKey}
                        onChange={handleSearchQuery}
                        />
                    </div>
                    <div>

                        <Button color='primary' className='mr-4' onClick={handleCreateUserClick}>
                            Create Users
                        </Button>


                        <Button color='primary'>
                            Export to CSV
                        </Button>
                    </div>
                </div>}
            </div>
            <Table aria-label="Example static collection table" selectionMode="multiple">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key} align="start">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users}>
                    {(user) => (

                        <TableRow key={user._id}>

                            {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                className="flex justify-center"
                total={totalPage}
                current={currentPage}
                onChange={onPageChange}
            />
        </>
    );
}
