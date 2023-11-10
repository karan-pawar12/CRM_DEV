import SuccessToast from "./SuccessToast"
import ErrorToast from "./ErrorToast";
import WarningToast from "./WarningToast";
import InfoToast from "./InfoToast";
import AdminContext from "../../AdminContext"
import { useContext } from "react"
export default function Toast({toastType,msg,onClose,timer=3000}){
    console.log(onClose,"I am line 8");
    const adminContext = useContext(AdminContext);
    let obj  = {
        "success" : <SuccessToast msg={msg} onClose={adminContext.hideToast} timer={timer}/>,
        "error" : <ErrorToast msg={msg} onClose={adminContext.hideToast} timer={timer}/>,
        "warning" : <WarningToast msg={msg} onClose={adminContext.hideToast} timer={timer}/>,
        "info" : <InfoToast msg={msg} onClose={adminContext.hideToast} timer={timer}/>
    }
    return(
        <>
            {
              obj[toastType]  
            }
        </>
    )
}