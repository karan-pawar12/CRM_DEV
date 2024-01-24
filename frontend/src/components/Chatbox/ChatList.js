import React, { useState, useMemo, useEffect, useContext } from "react";
import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar, Input, Button } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import getAllUserWithoutskip from "../../api_strings/admin/getallUserWithoutskip";
import AdminContext from "../../AdminContext";
import ChatPopup from "./Chatbox";
import { users } from "./data";

export default function App() {
    const [values, setValues] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [userNames, setUsernames] = useState([]);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [chatPopups, setChatPopups] = useState({});
    const admincontext = useContext(AdminContext)

    useEffect(() => {
        getAllUserWithoutskip((error, res) => {
            if (res) {
                setUsernames(res.data)
            } else {
                admincontext.setToast({
                    msg: "Unable to fetch users try again",
                    toastType: "error",
                    onClose: null
                })
            }
        })
    }, []);


    const filteredUsers = useMemo(() => {
        return userNames.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const arrayValues = Array.from(values);

    const topContent = (
        <div className="w-full py-2 px-2">
            <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );

    const handleSelectionChange = (newValues) => {
        setValues(newValues);
        // Show the button if any user is selected
        setButtonVisible(newValues.size > 0);
    };

    const createChat = () => {
        const newRecipientIds = Array.from(values);

        // Sort the recipient IDs to ensure consistent grouping
        const sortedRecipientIds = newRecipientIds.sort((a, b) => a - b);
        const groupId = sortedRecipientIds.join('_');

        setChatPopups((prevChatPopups) => {
            const newChatPopups = { ...prevChatPopups };

            // Check if a chat popup with the same group already exists
            if (!newChatPopups[groupId]) {
                // Create a new chat popup for the group
                newChatPopups[groupId] = {
                    isModalOpen: true,
                    recipientIds: sortedRecipientIds,
                };
            }

            return newChatPopups;
        });
    };

    // 123 
    // karan -ayushman
    // isModalOpen : true
    // recipientIds

       



    return (
        <div className="fixed bottom-10 w-full flex justify-end">
            <ListboxWrapper>
                <div className="h-full bg-red-200">
                    <Listbox
                        topContent={topContent}
                        items={filteredUsers}
                        label="Assigned to"
                        selectionMode="multiple"
                        onSelectionChange={handleSelectionChange}
                        variant="flat"
                    >
                        {(item) => (
                            <ListboxItem key={item.id} textValue={item.name}>
                                <div className="flex gap-2 items-center">
                                    <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.avatar} />
                                    <div className="flex flex-col">
                                        <span className="text-small">{item.name}</span>
                                        <span className="text-tiny text-default-400">{item.email}</span>
                                    </div>
                                </div>
                            </ListboxItem>
                        )}
                    </Listbox>
                    {buttonVisible && (
                        <div className="text-center mt-4">
                            <Button onClick={createChat} className="w-full" color="primary">
                                Create Chat
                            </Button>
                        </div>
                    )}
                </div>



            </ListboxWrapper>

            {Object.entries(chatPopups).map(([groupId, popupInfo]) => (
                <ChatPopup
                    key={groupId}
                    isModalOpen={popupInfo.isModalOpen}
                    setIsModalOpen={(isOpen) => setChatPopups((prevPopups) => ({ ...prevPopups, [groupId]: { ...prevPopups[groupId], isModalOpen: isOpen } }))}
                    recipientIds={popupInfo.recipientIds}
                    index={popupInfo.index}
                />
            ))

            }
        </div>
    );
}
