import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,Input} from "@nextui-org/react";

export default function MailSender({isModalOpen,setModalOpen}) {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div>
      <Modal isOpen={isModalOpen}  onOpenChange={(isOpen) => {if(!isOpen) setModalOpen(false)}}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                     <Input
                     type="email"
                     label="Subject"
                     labelPlacement="outside"
                     placeholder="Subject of ticket"
                    />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => setModalOpen(false)}>
                  Close
                </Button>
                <Button color="primary">
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}