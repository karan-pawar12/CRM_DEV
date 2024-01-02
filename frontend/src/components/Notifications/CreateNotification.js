import { useEffect,useState,useContext } from "react";
import { Button } from "@nextui-org/react";
import Forms from "../Inputform/Forms";
import getAllUserWithoutskip from "../../api_strings/admin/getallUserWithoutskip";
import Createnotification_api from "../../api_strings/admin/createNotification_api";
import Backbutton from "../Backbutton";
import AdminContext from "../../AdminContext";
import Toast from '../ToastsContainers/Toast'

function CreateNotification({onCreateSuccess}){
    const[userArr,setuserArr] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const admincontext = useContext(AdminContext);

    function onSubmitForm() {
        setFormSubmitted(true);
    }

    const onSubmit = (formData) => {
        const {title,content,data,recipients} = formData;
        const recipientsArray = Object.values(recipients);
        Createnotification_api(title,content,data,recipientsArray,(error,res) => {
            if(error){
                admincontext.setToast({
                    msg: "Unable to create notification",
                    toastType: "error",
                    onClose: null
                })
                setFormSubmitted(false);
            }
            else{
                admincontext.setToast({
                    msg: "Notification created successfully",
                    toastType: "success",
                    onClose: null
                })
                onCreateSuccess(res.data);
            }
        })


    }

    useEffect(() => {
        getAllUserWithoutskip((error, res) => {
            if (error) {
              console.log("Error:", error);
            } else {
                setuserArr(res.data);
            }
          });
    },[])

    return(
        <>
        {
          admincontext.toast.msg && <Toast {...admincontext.toast} />
        }
        <Backbutton />
        <div className="w-full">
                <div className="flex justify-end mt-5">
                    <Button color="primary" onClick={onSubmitForm}>
                        Save
                    </Button>
                </div>
            <Forms
                formSubmitted={formSubmitted}
                setFormSubmitted={setFormSubmitted}
                fields={
                    [
                        {
                            name:"title",
                            label:"Title",
                            type:"Input",
                            inputType: "text"
                        },
                        {
                            name:"content",
                            label:"Content",
                            type:"Input",
                            inputType: "text"
                        },
                        {
                            name:"data",
                            label:"Module",
                            type:"Select",
                            options:[
                                {name:"dashboard",id:"dashboard"},
                                {name:"users",id:"users"},
                                {name:"leads",id:"leads"},
                                {name:"roles",id:"roles"},
                                {name:"support",id:"support"},
                                {name:"notification",id:"notification"}
                            ],
                            
                            selectionMode: "single"
                        },
                        {
                            name:"recipients",
                            label:"Add Participants",
                            type:"Select",
                            options:userArr,
                            selectionMode: "multiple"
                        },
                        
                    ]}
                    
                    
                selectionModeProps= "multiple"
                onSubmit={onSubmit}
            />
        </div>
        </>
    )
}

export default CreateNotification;