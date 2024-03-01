import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalBody, Chip, Input, Card, ListboxItem, Listbox, Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import RichText from "./RichText";
import forwardTicketMsg_api from "../../api_strings/admin/forwardTicketMsg_api";

export default function ForwardTicket({ isModalOpen, setModalOpen, id, setTicketDetailsData, userNames,ticketDetailsData }) {
    const [data, setData] = useState('');
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [selectedEmailsSet, setSelectedEmailsSet] = useState(new Set());

    useEffect(() => {
        setSelectedEmails(Array.from(selectedEmailsSet))
    }, [selectedEmailsSet]);

    function toggleshowSearchOptions() {
        setShowSearchOptions(old => !old)
    }

    function handleBlur(e) {
        setTimeout(() => {
            setShowSearchOptions(false)
        }, 500)
    }

    function handleClose(val) {
        setSelectedEmails(selectedEmails.filter(fruit => fruit !== val));
        setSelectedEmailsSet(prevSet => {
            const newSet = new Set(prevSet);
            newSet.delete(val);
            return newSet;
        });
    }


    function handleData() {
        if (data !== '') {
            forwardTicketMsg_api(data, id, "forward", selectedEmails, (error, res) => {
                if (res) {
                    console.log(res.data);
                    setTicketDetailsData(old => ({
                        ...old, // Spread the old state
                        content: [...old.content, res.data]
                    }));

                    setData('');
                }
            })
        }
    }

    return (
        <Modal size='xl' scrollBehavior="inside" isOpen={isModalOpen} onOpenChange={(isOpen) => { if (!isOpen) setModalOpen(false) }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Forward</ModalHeader>
                        <ModalBody>
                            <div className="flex bg-[#F5F7F9] p-2">
                                <span className="mr-2">Subject:</span>
                                <p className="font-bold">{ticketDetailsData.subject}</p>
                            </div>
                            <div className="flex bg-[#F5F7F9] p-2">
                                <span className="mr-2">To:</span>
                                <div className="relative w-full">
                                    <Input startContent={<div className="flex gap-2">
                                        {selectedEmails.map((x) => (
                                            <Chip onClose={() => handleClose(x)}>{x}</Chip>
                                        ))}
                                    </div>} size="sm" onFocus={toggleshowSearchOptions} onBlur={handleBlur} />
                                    {showSearchOptions && (
                                        <Card className="bg-white border z-20 absolute p-5 w-full">
                                            <Listbox
                                                items={userNames}
                                                aria-label="Dynamic Actions"
                                                selectedKeys={selectedEmailsSet}
                                                onSelectionChange={setSelectedEmailsSet}
                                                selectionMode="multiple"
                                            >
                                                {(item) => (
                                                    <ListboxItem
                                                        key={item.email}
                                                    >
                                                        {item.email}
                                                    </ListboxItem>
                                                )}
                                            </Listbox>
                                        </Card>
                                    )}
                                </div>
                            </div>
                            <div className="w-full">
                                <RichText data={data} setData={setData} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => setModalOpen(false)}>Close</Button>
                            <Button color="primary" onClick={handleData}>Send</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}