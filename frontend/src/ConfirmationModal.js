import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

export default function ConfirmationModal(props) {
    const { open, data, closeConfirmationModal,openConfirmationModal } = props;

    return (
        <>
            <Modal
                isOpen={open}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div>
                                    {data.msg}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={() => closeConfirmationModal(false)}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() =>{
                                    data.listener();
                                    closeConfirmationModal();
                                }}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}

                </ModalContent>
            </Modal>
        </>
    );
}
