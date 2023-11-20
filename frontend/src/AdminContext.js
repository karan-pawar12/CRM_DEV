import { createContext, useState, useRef } from "react";
import axios from "axios";

const AdminContext = createContext({
});

export function AdminContextProvider(props) {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [confirmModalData, setConfirmModalData] = useState({
        msg: '',
        listener: null,
    });
    const [toast,setToast] = useState({
        msg:null,
        toastType:null,
        onClose:null
    });

    function openConfirmationModal(msg, listener) {
        setConfirmModalData({ msg, listener });
        setConfirmModalOpen(true);
    }

    function closeConfirmationModal() {
        setConfirmModalOpen(false);
    }

    function hideToast() {
        setToast({
            msg:null,
            toastType:null,
            onClose:null
        })
    }

    const context = {
        confirmModalOpen,openConfirmationModal,
        confirmModalData,closeConfirmationModal,
        toast,setToast,hideToast
    }

    return <AdminContext.Provider value={context}>
        {props.children}
    </AdminContext.Provider>

}

export default AdminContext;