import { useState, useEffect } from "react";
import { Modal, ModalContent, ModalBody, Chip, Input, Card, ListboxItem, Listbox, Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import RichTextEditor from "./RichText";
import forwardTicketMsg_api from "../../api_strings/admin/forwardTicketMsg_api";
import FileCard from "../FileCards/FileCard";

export default function ForwardTicket({ isModalOpen, setModalOpen, id, setTicketDetailsData, userNames, ticketDetailsData }) {
    const [content, setContent] = useState('');
    const [attachments, setAttachments] = useState([]);
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


    function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        for(let i=0;i<attachments.length;i++){
            formData.append('attachments', attachments[i]);
        }

        formData.append('content', content);
        formData.append('ticketId',id)
        formData.append('msgType',"forward")
        
        for(let i=0;i<selectedEmails.length;i++){
            formData.append('selectedEmails', selectedEmails[i]);
        }

        if (content !== '') {
            forwardTicketMsg_api(formData, (error, res) => {
                if (res) {
                    setTicketDetailsData(old => ({
                        ...old, // Spread the old state
                        content: [...old.content, res.data]
                    }));


                    setContent('');
                }
            })
        }
    }

    function onAttachmentChange(e) {
        setAttachments(Array.from(e.target.files));
    }

    return (
        <Modal size='xl' scrollBehavior="inside" isOpen={isModalOpen} onOpenChange={(isOpen) => { if (!isOpen) setModalOpen(false) }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Forward</ModalHeader>
                        <ModalBody>
                            <form method="post" onSubmit={onSubmit} autoComplete="off">
                                <div className="flex bg-[#F5F7F9] p-2">
                                    <span className="mr-2">Subject:</span>
                                    <p className="font-bold">{ticketDetailsData.subject}</p>
                                </div>
                                <div className="flex bg-[#F5F7F9] p-2 mt-4">
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

                                {/* Attachment added through RichText and FileCard shows pdf,excel file with icons */}
                                <div className="col-span-2 h-28 mb-24 mt-4">
                                    <RichTextEditor
                                        value={content}
                                        onChange={setContent}
                                        onAttachmentChange={onAttachmentChange}
                                    />

                                    <div className="flex gap-2 mt-4 w-full flex-wrap">
                                        {
                                            attachments.map((x, index) => {
                                                return <FileCard name={x.name} size={x.size} onRemove={() => {
                                                    setAttachments(old => {
                                                        let temp = old;
                                                        temp.splice(index, 1);


                                                        return [...temp];
                                                    });
                                                }} />
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="col-span-2 mt-12 flex justify-end ">
                                    <div className="flex gap-2">
                                        <Button variant="bordered" onPress={() => setModalOpen(false)}>
                                            Close
                                        </Button>
                                        <Button type="submit"
                                            color="primary" onSubmit={onSubmit}>
                                            Create
                                        </Button>
                                    </div>
                                </div>

                            </form>
                        </ModalBody>
                        <ModalFooter>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
